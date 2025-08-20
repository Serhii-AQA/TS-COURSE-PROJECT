import {expect, test} from "@playwright/test";
import { USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';
import path from "path";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify successful login', async ({ request }) => {
    const response = await request.post('/auth/login', {
        data: { email: USER_EMAIL, password: USER_PASSWORD },
    });
    expect(response.status()).toBe(200);

    await request.storageState({ path: authFile });
});
