import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { USER_EMAIL, USER_PASSWORD, USER_NAME } from '../config/baseConfig';
import { WebRoutes } from '../constants/webRoutes';

test.describe('Login', () => {
    test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

    test('Verify login with valid credentials', async ({ app }) => {
        await app.loginPage.navigateTo(WebRoutes.AuthLogin);
        await app.loginPage.loginAs(USER_EMAIL, USER_PASSWORD);
        await expect(app.page).toHaveURL('https://practicesoftwaretesting.com/account');

        await expect(
            app.accountPage.title,
            'Account page title is not visible',
            ).toHaveText('My account');
        await expect(app.loginPage.headerComponent.accountName,
            'User name is not visible',
            ).toHaveText(USER_NAME);
    });

    test('Verify login as a new user via API request', async ({ app ,loggedInAsNewUser }) => {
        await app.accountPage.navigateTo(WebRoutes.Account);
        await expect(
            app.accountPage.title,
            'Account page title is not visible',
        ).toHaveText('My account');

        await expect(app.loginPage.headerComponent.accountName,
            'User name is not visible',
        ).toHaveText(`${loggedInAsNewUser.user.userModel.first_name} ${loggedInAsNewUser.user.userModel.last_name}`);
    });
});
