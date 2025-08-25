import { USER_EMAIL, USER_PASSWORD, WEB_URL } from '../config/baseConfig';
import path from 'path';
import { expect, test as setup } from '@playwright/test';
import { WebRoutes } from '../constants/webRoutes';
import { ApiEndpoints } from '../constants/apiEndpoints';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Authenticate and save token', async ({ browser, request }) => {
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

    await page.context().storageState({ path: authFile });
    await page.close();
});
