import {expect, test} from "@playwright/test";
import {baseConfig} from "../config/baseConfig";
import {ApplicationPage} from "../pages/appPage";

test.describe('Login', () => {
    test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

    test('Verify login with valid credentials', async ({ page }) => {
        const app = new ApplicationPage(page);

        await app.login.navigateTo('/auth/login');
        await app.login.loginAs(baseConfig.USER_EMAIL, baseConfig.USER_PASSWORD)
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

        await expect(
            app.account.title,
            'Account page title is not visible',
            ).toHaveText('My account');
        await expect(app.account.header.accountName,
            'User name is not visible',
            ).toHaveText(baseConfig.USER_NAME);
    });
});
