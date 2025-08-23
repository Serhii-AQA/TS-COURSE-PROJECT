import { Page} from "playwright-core";
import {HeaderComponent} from "./component/headerComponent";
import {Url} from "../constants/url";

export abstract class BasePage {
    protected readonly page: Page;
    readonly headerComponent: HeaderComponent;

    constructor(page: Page) {
        this.page = page;
        this.headerComponent = new HeaderComponent(this.page);
    }

    async navigateTo(url: string = Url.Home) {
        await this.page.goto(url, {
            waitUntil: 'load',
        });
    }
}
