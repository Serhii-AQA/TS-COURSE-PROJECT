import { expect, APIRequestContext } from "@playwright/test";

// export async function waitForApiStatus(request: APIRequestContext, url: string, expectedStatus: number = 200) {
//     await expect.poll(async () => {
//         const response = await request.get(url);
//         return response.status();
//     }, {
//         message: `API ${url} don't returned status ${expectedStatus}`,
//     }).toBe(expectedStatus);
// }


// export async function waitForApiStatus(request: APIRequestContext, url: string, expectedStatus: number = 200) {
//     await expect.poll(async () => {
//         const response = await request.get(url, {
//             headers: {
//                 Authorization: `Bearer ${process.env.API_TOKEN}`,
//             },
//         });
//         return response.status();
//     }, {
//         message: `API ${url} didn't return status ${expectedStatus}`,
//         timeout: 15000,
//     }).toBe(expectedStatus);
// }


export async function waitForApiStatus(request: APIRequestContext, endpoint: string, expectedStatus: number = 200) {
    const url = `${process.env.WEB_URL}${endpoint}`;
    await expect.poll(async () => {
        const response = await request.get(url, {
            headers: {
                // якщо потрібна авторизація
                // Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        });
        return response.status();
    }, {
        message: `API ${url} didn't return status ${expectedStatus}`,
        timeout: 15000,
    }).toBe(expectedStatus);
}

