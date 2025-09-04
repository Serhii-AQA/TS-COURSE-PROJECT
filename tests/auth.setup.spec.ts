import { USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';
import path from 'path';
import { test as setup } from '@playwright/test';
import { WebRoutes } from '../constants/webRoutes';
import { ApiEndpoints } from '../constants/apiEndpoints';
import fs from 'fs';

type LoginResponse = {
    access_token: string;
};
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Authenticate and save token', async ({ request }) => {
    const res = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersLogin}`, {
        data: {
            email: USER_EMAIL,
            password: USER_PASSWORD,
        }
    });

    if (res.status() !== 200) {
        throw new Error(`Login failed, status: ${res.status()}`);
    }

    const body = (await res.json()) as LoginResponse;
    const token = body.access_token;

    if (!token) {
        throw new Error('No access token in response');
    }

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    fs.writeFileSync(authFile, JSON.stringify({ token }, null, 2));
});
