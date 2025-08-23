import { expect, APIRequestContext } from "@playwright/test";

export async function waitForApiStatus(request: APIRequestContext, url: string, expectedStatus: number = 200) {
    await expect.poll(async () => {
        const response = await request.get(url);
        return response.status();
    }, {
        message: `API ${url} don't returned status ${expectedStatus}`,
    }).toBe(expectedStatus);
}
