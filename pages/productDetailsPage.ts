import { BasePage } from './basePage';
import { Locator } from 'playwright-core';

export class ProductDetailsPage extends BasePage {
    readonly productName: Locator = this.page.getByTestId('product-name');
    readonly productPrice: Locator = this.page.getByTestId('unit-price');
    readonly addToCartButton: Locator = this.page.getByTestId('add-to-cart');
    readonly addToFavoritesButton: Locator = this.page.getByTestId('add-to-favorites');
    readonly productAddedAlertMessage: Locator = this.page.getByRole('alert', { name: 'Product added to shopping cart.' });
}