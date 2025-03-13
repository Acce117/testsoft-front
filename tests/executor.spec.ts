import { test, expect } from "@playwright/test";
import { belbinResponses } from "./utils/testResponsesBody";
const baseURL = "http://localhost:5173/";
const apiURL = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator("#user-input").fill("Acce117");
  await page.locator("#password-input").fill("12345678");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(baseURL);
});
test("Login", async ({ page }) => {
  await expect(page).toHaveURL("http://localhost:5173/");
});

test("Select Belbin Test", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-Belbin-button").nth(2).click();
  await page.locator("#start-button").click();
  await expect(page).toHaveURL("http://localhost:5173/execute-test/3");
});

test("Correct Belbin Test Execution ", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-Belbin-button").nth(2).click();
  await page.locator("#start-button").click();
  await expect(page).toHaveURL("http://localhost:5173/execute-test/3");

  const inputs = await page.locator(".p-inputnumber-input").all();
  for (let i = 0; i < inputs.length; i++) {
    await inputs[i].fill("");
    await inputs[i].pressSequentially(belbinResponses[i]);
  }

  await page.locator("#finish-test-button").click();
  await page.locator(".p-confirmdialog-accept-button").click();

  await expect(page).toHaveURL("http://localhost:5173/my-results");
  const executeTestPromise = page.waitForResponse(
    "http://localhost:3000/execute_test"
  );
  const executeTestResponse = await executeTestPromise;
  expect(executeTestResponse.status()).toBe(201);

  const items = await Promise.all(
    (await page.locator(".item").all()).map(async (i) => await i.textContent())
  );

  expect(items).toStrictEqual([
    "Cohesionador  (Roles Sociales )",
    "Investigador de Recursos (Roles Sociales )",
    "Finalizador  (Roles de Acción)",
    "Coordinador (Roles Sociales )",
    "Impulsor  (Roles de Acción)",
    "Monitor - Evaluador (Roles Mentales)",
  ]);
});

test("Incomplete Belbin Test Execution ", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-Belbin-button").nth(2).click();
  await page.locator("#start-button").click();
  await expect(page).toHaveURL("http://localhost:5173/execute-test/3");

  await page.locator("#finish-test-button").click();
  const errorMessage = await page.locator(".p-toast-detail").textContent();

  expect(errorMessage).toBe(
    "There are points to be assigned yet in the questions 1, 2, 3, 4, 5, 6 and 7"
  );
});

test("Test Execution When There is a Test Application Already", async ({
  page,
}) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  const isButtonDisabled = await page
    .locator("#execute-test-Belbin-button-disabled")
    .nth(2)
    .isDisabled();

  expect(isButtonDisabled).toBe(true);
});
