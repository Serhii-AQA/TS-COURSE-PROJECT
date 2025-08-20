import {expect, test} from "@playwright/test";
import { USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';
import {Application} from "../pages/app";
import path from "path";
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.skip(!!process.env.CI, 'Test is skipped in CI due to the Cloudflare protection.');

test('Verify successful login', async ({ page }) => {
    const app = new Application(page);
    await app.login.navigateTo('/auth/login');
    await app.login.loginAs(USER_EMAIL, USER_PASSWORD)
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

    await page.context().storageState({ path: authFile });
});

