import {Page} from "playwright-core";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string = '/') {
        await this.page.goto(url, {
            waitUntil: 'load',
        });
    }
}
