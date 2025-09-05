import { test as base, expect } from '@playwright/test';
import { Application } from './pages/app';
import { USER_EMAIL, USER_PASSWORD } from './config/baseConfig';
import { UserLoginBody, UserLoginResponse } from './typings/user';
import { ApiEndpoints } from './constants/apiEndpoints';
import { WebRoutes } from './constants/webRoutes';

type MyFixtures = {
    app: Application;
};

const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});

const loggedInUser = test.extend<MyFixtures>({
    app: async ({ app, request, page }, use) => {
        const { email, password }: UserLoginBody = {
           email: USER_EMAIL,
            password: USER_PASSWORD
        };

        const response = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersLogin}`, {
            data: {
                email,
                password,
            }
        });
        expect(response.ok()).toBeTruthy();

        const responseBody= await  response.json() as UserLoginResponse;
        await page.goto(WebRoutes.Home, { waitUntil: 'commit' });

        await page.evaluate((token) => {
            return window.localStorage.setItem('auth-token', token);
        }, responseBody.access_token);

        await app.homePage.navigateTo(WebRoutes.Home);

        await use(app);
    },
});

export { test, expect, loggedInUser };
