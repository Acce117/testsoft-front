import { test, expect } from "@playwright/test";
import { belbinResponses, mbtiResponses } from "./utils/testResponsesBody";
const baseURL = "http://localhost:5173/";
const apiURL = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator("#user-input").fill("Acce117");
  await page.locator("#password-input").fill("12345678");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(baseURL);
});

test("Incomplete Belbin Test Execution ", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-3-button").nth(2).click();
  await page.locator("#start-button").click();
  await expect(page).toHaveURL("http://localhost:5173/execute-test/3");

  await page.locator("#finish-test-button").click();
  const errorMessage = await page.locator(".p-toast-detail").textContent();

  expect(errorMessage).toBe(
    "There are points to be assigned yet in the questions 1, 2, 3, 4, 5, 6 and 7"
  );
});



test("Correct Belbin Test Execution ", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-3-button").nth(2).click();
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
    "Finalizador  (Roles de Acción)",
    "Cerebro  (Roles Mentales)",
    "Implementador  (Roles de Acción)",
    "Coordinador (Roles Sociales )",
    "Impulsor  (Roles de Acción)",
    "Investigador de Recursos (Roles Sociales )",
  ]);
});

test("Belbin Execution When There is a Test Application Already", async ({
  page,
}) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  const isButtonDisabled = await page
    .locator("#execute-test-3-button-disabled")
    .nth(2)
    .isDisabled();

  expect(isButtonDisabled).toBe(true);
});

test("Incomplete MBTI Test Execution ", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-4-button").nth(2).click();
  await page.locator("#start-button").click();
  await expect(page).toHaveURL("http://localhost:5173/execute-test/4");

  await page.locator("#finish-test-button").click();
  const errorMessage = await page
    .locator(".p-toast-detail")
    .nth(1)
    .textContent();

  expect(errorMessage).toBe(
    "You must select an answer in the questions 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 and 32"
  );
});

test("Correct MBTI Test Execution ", async ({ page }) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.locator("#execute-test-4-button").nth(2).click();
  await page.locator("#start-button").click();
  await expect(page).toHaveURL("http://localhost:5173/execute-test/4");

  let questions = await page.locator(".question").all();
  for (let i = 0, j = 0; i < mbtiResponses.length; i++, j++) {
    await questions[j].locator("#answer-" + mbtiResponses[i]).check();
    if (
      mbtiResponses[i] == 134 ||
      mbtiResponses[i] == 203 ||
      mbtiResponses[i] == 243
    ) {
      await page.locator("#next-serie-button").click();

      await page.waitForSelector(".question", { state: "attached" });

      questions = await page.locator(".question").all();
      j = -1;
    }
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

  expect(items).toStrictEqual(["S", "I", "J", "T"]);
});

test("MBTI Execution When There is a Test Application Already", async ({
  page,
}) => {
  await page.goto(baseURL + "select-test");

  const responsePromise = page.waitForResponse(
    "http://localhost:3000/user/1/tests"
  );

  const response = await responsePromise;
  expect(response.status()).toBe(200);

  const isButtonDisabled = await page
    .locator("#execute-test-4-button-disabled")
    .nth(2)
    .isDisabled();

  expect(isButtonDisabled).toBe(true);
});
