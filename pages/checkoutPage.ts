import { BasePage } from './basePage';
import { Locator } from 'playwright-core';

export class CheckoutPage extends BasePage {
    readonly productQuantityField: Locator = this.page.getByTestId('product-quantity');
    readonly productTitle: Locator = this.page.getByTestId('product-title');
    readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
}
