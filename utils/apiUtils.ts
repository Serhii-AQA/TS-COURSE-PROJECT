import { expect, APIRequestContext } from '@playwright/test';
import { ApiEndpoints } from '../constants/apiEndpoints';

export async function waitForApiStatus(request: APIRequestContext, endpoint: string, expectedStatus: number = 200) {
    const url = `${ApiEndpoints.ApiBase}${endpoint}`;
    await expect.poll(async () => {
        const response = await request.get(url);
        return response.status();
    }, {
        message: `API ${url} didn't return status ${expectedStatus}`,
        timeout: 10_000,
    }).toBe(expectedStatus);
}
