import { Page} from "playwright-core";
import {HeaderComponent} from "./component/headerComponent";

export abstract class BasePage {
    protected readonly page: Page;
    readonly headerComponent: HeaderComponent;

    constructor(page: Page) {
        this.page = page;
        this.headerComponent = new HeaderComponent(this.page);
    }

    async navigateTo(url: string = '/') {
        await this.page.goto(url, {
            waitUntil: 'load',
        });
    }
}
