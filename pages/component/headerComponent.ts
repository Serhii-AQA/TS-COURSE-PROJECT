import {Locator, Page} from "playwright-core";

export class HeaderComponent {
    readonly page: Page;
    readonly accountName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountName = this.page.getByTestId('nav-menu');
    }
}