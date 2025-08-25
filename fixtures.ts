import { test as base, expect } from '@playwright/test';
import { Application } from './pages/app';
import { ApiEndpoints } from './constants/apiEndpoints';
import { WebRoutes } from './constants/webRoutes';
import { USER_EMAIL, USER_PASSWORD, WEB_URL } from './config/baseConfig';

type MyFixtures = {
    app: Application;
    apiLogIn: Application;
};

export const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },

    apiLogIn: async ({ browser, request }, use) => {
        const res = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersLogin}`, {
            data: {
                email: USER_EMAIL,
                password: USER_PASSWORD,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        expect(res.status()).toBe(200);
        const body = await res.json();
        const token = body?.access_token || body?.token;
        expect(token).toBeTruthy();

        const page = await browser.newPage();
        await page.goto(WEB_URL);
        await page.evaluate((token) => {
            localStorage.setItem('auth-token', token);
        }, token);

        const app = new Application(page);
        await use(app);

        await page.close();
    },
});
