import { expect, APIRequestContext } from "@playwright/test";
import {Url} from "../constants/url";

export async function waitForApiStatus(request: APIRequestContext, endpoint: string, expectedStatus: number = 200) {
    const url = `${Url.ApiBase}${endpoint}`;
    console.log('url -------> ', url)
    await expect.poll(async () => {
        const response = await request.get(url);
        return response.status();
    }, {
        message: `API ${url} didn't return status ${expectedStatus}`,
        timeout: 15000,
    }).toBe(expectedStatus);
}
