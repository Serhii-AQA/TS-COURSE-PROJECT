import { test as base } from '@playwright/test';
import { Application } from './pages/app';
import {  WEB_URL } from './config/baseConfig';
import path from 'path';
import fs from 'fs';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

type MyFixtures = {
    app: Application;
    apiLogIn: Application;
};

export const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },

    apiLogIn: async ({ browser }, use) => {
        const authFile = path.join(__dirname, './playwright/.auth/user.json');
        const { token } = JSON.parse(fs.readFileSync(authFile, 'utf-8'));

        const page = await browser.newPage();
        await page.goto(WEB_URL);
        await page.evaluate((token) => {
            localStorage.setItem('auth-token', token);
        }, token);

        const app = new Application(page);
        await use(app);

        await app.page.close();
    },
});
