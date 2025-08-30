import { Page } from 'playwright-core';
import { HeaderComponent } from './component/headerComponent';
import { WebRoutes } from '../constants/webRoutes';
import { AlertsComponent } from './component/alertsComponent';

export abstract class BasePage {
    protected readonly page: Page;
    readonly headerComponent: HeaderComponent;
    readonly alertsComponent: AlertsComponent;

    constructor(page: Page) {
        this.page = page;
        this.headerComponent = new HeaderComponent(this.page);
        this.alertsComponent = new AlertsComponent(this.page);
    }

    async navigateTo(url: string = WebRoutes.Home) {
        await this.page.goto(url, {
            waitUntil: 'load',
        });
    }
}
