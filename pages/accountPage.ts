import { Locator } from 'playwright-core';
import { BasePage } from './basePage';

export class AccountPage extends BasePage{
    readonly title: Locator = this.page.getByTestId('page-title');
}
