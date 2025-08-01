import {expect, test} from "@playwright/test";

test.describe('Login', () => {
    test('Verify login with valid credentials', async ({ page }) => {
        await page.goto('/auth/login');
        await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
        await page.getByTestId('password').fill('welcome01');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
        await expect(page.getByTestId('page-title')).toHaveText('My account');
        await expect( page.getByTestId('nav-menu')).toHaveText('Jane Doe');
    });
});
