import { USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';
import path from 'path';
import { expect, test as setup } from '@playwright/test';
import { WebRoutes } from '../constants/webRoutes';
import { ApiEndpoints } from '../constants/apiEndpoints';
import fs from 'fs';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable playwright/no-standalone-expect */

setup('Authenticate and save token', async ({ request }) => {
    const res = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersLogin}`, {
        data: {
            email: USER_EMAIL,
            password: USER_PASSWORD,
        }
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    const token = body.access_token;
    expect(token).toBeTruthy();

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    fs.writeFileSync(authFile, JSON.stringify({ token }, null, 2));
});
