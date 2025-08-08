import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {AccountPage} from "../pages/AccountPage";
import {baseConfig} from "../config/baseConfig";

test.describe('Login', () => {
    test('Verify login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        console.log('baseURL =', process.env.WEB_URL);
        await loginPage.navigateTo('/auth/login');
        await loginPage.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD)
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

        const accountPage = new AccountPage(page);
        await expect(
            accountPage.title,
            'Account page title is not visible',
            ).toHaveText('My account');
        await expect(accountPage.header.accountName,
            'User name is not visible',
            ).toHaveText(baseConfig.USER_NAME);
    });
});
