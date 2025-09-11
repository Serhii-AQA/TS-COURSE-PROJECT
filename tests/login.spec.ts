import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { USER_EMAIL, USER_NAME, USER_PASSWORD } from '../config/baseConfig';
import { WebRoutes } from '../constants/webRoutes';

test.describe('Login', {
	tag: ['@regression', '@smoke'],
}, () => {
	test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

	test('Verify login with valid credentials', async ({ app }) => {
		await test.step('Navigate to Login Page', async () => {
			await app.loginPage.navigateTo(WebRoutes.AuthLogin);
		});

		await test.step('Perform login with valid credentials', async () => {
			await app.loginPage.loginAs(USER_EMAIL, USER_PASSWORD);
		});

		await test.step('Verify user is redirected to Account page', async () => {
			await expect(app.page).toHaveURL('https://practicesoftwaretesting.com/account');
		});

		await test.step('Verify Account page title is visible', async () => {
			await expect(
				app.accountPage.title,
				'Account page title is not visible',
			).toHaveText('My account');
		});

		await test.step('Verify account name is visible in header', async () => {
			await expect(
				app.loginPage.headerComponent.accountName,
				'User name is not visible',
			).toHaveText(USER_NAME);
		});
	});

	test('Verify login as a new user via API request', async ({ app, loggedInAsNewUser }) => {
		await test.step('Navigate to Account page', async () => {
			await app.accountPage.navigateTo(WebRoutes.Account);
		});

		await test.step('Verify Account page title is visible', async () => {
			await expect(
				app.accountPage.title,
				'Account page title is not visible',
			).toHaveText('My account');
		});

		await test.step('Verify new user name is visible in header', async () => {
			await expect(
				app.loginPage.headerComponent.accountName,
				'User name is not visible',
			).toHaveText(`${loggedInAsNewUser.user.userModel.first_name} ${loggedInAsNewUser.user.userModel.last_name}`);
		});
	});
});
