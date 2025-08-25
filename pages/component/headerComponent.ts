import { Locator, Page } from 'playwright-core';

export class HeaderComponent {
    readonly page: Page;
    readonly accountName: Locator;
    readonly cartItem: Locator;
    readonly categoriesDD: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountName = this.page.getByTestId('nav-menu');
        this.cartItem = this.page.getByTestId('nav-cart');
        this.categoriesDD = this.page.getByRole('button', { name: 'Categories' });
    }
}
