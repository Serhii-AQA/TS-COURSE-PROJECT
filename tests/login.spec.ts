import {expect, test} from "@playwright/test";
import { USER_EMAIL, USER_PASSWORD, USER_NAME } from '../config/baseConfig';
import {Application} from "../pages/app";

test.describe('Login', () => {
    test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

    test('Verify login with valid credentials', async ({ page }) => {
        const app = new Application(page);

        await app.loginPage.navigateTo('/auth/login');
        await app.loginPage.loginAs(USER_EMAIL, USER_PASSWORD)
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

        await expect(
            app.accountPage.title,
            'Account page title is not visible',
            ).toHaveText('My account');
        await expect(app.loginPage.headerComponent.accountName,
            'User name is not visible',
            ).toHaveText(USER_NAME);
    });
});
