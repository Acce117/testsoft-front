import { test, expect } from '@playwright/test';
const baseURL = 'http://localhost:5173/'
const apiURL = 'http://localhost:3000/'



test.beforeEach( async ({ page }) => {
  
  await page.goto('http://localhost:5173/');
  await page.locator('#user-input').fill('tgarcia')
  await page.locator('#password-input').fill('123456')
  await page.locator('#login-button').click()

  await expect(page).toHaveURL(baseURL);
});
test('Login', async ({ page }) => {

  await expect(page).toHaveURL('http://localhost:5173/');
});


test('Get Functional Roles', async ({ page }) => {

  await page.goto(baseURL+'functional_roles');
  
  const responsePromise = page.waitForResponse('http://localhost:3000/functional_role')

  const response = await responsePromise
  expect(response.status()).toBe(200)
  
  const table = page.locator('table'); 
  await expect(table).toBeVisible(); 

  const records = table.locator('tbody tr');
  const count = await records.count();

  if (count > 0) {
    
    for (let i = 0; i < count; i++) {
      const celda = records.nth(i).locator('td').first();
      await expect(celda).not.toBeEmpty(); 
    }
  } else {
    const emptyMessage = page.locator('.empty-message'); 
    await expect(emptyMessage).toBeVisible(); 
  }
});
