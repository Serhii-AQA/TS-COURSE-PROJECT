import { expect, APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config/baseConfig';

export async function waitForApiStatus(request: APIRequestContext, endpoint: string, expectedStatus: number = 200) {
    const url = `${API_BASE_URL}${endpoint}`;
    await expect.poll(async () => {
        const response = await request.get(url);
        return response.status();
    }, {
        message: `API ${url} didn't return status ${expectedStatus}`,
        timeout: 10_000,
    }).toBe(expectedStatus);
}
