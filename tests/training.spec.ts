import { test, expect } from '@playwright/test';

test('login sauce demo', async ({ page }) => {
    // 1. Ir a la página web
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user')
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    //await expect(page).toHaveTitle(/Example Domain/);
});