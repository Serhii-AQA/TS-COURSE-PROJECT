import { BasePage } from "./basePage";
import { Locator } from "playwright-core";

export class HomePage extends BasePage {
    readonly productsCard: Locator = this.page.getByTestId(/product/);
    readonly productName: Locator = this.productsCard.getByTestId('product-name');
    readonly productPrice: Locator = this.productsCard.getByTestId('product-price');
    readonly productLocator = (productName: string) =>  this.productsCard.filter({ hasText: productName });
    readonly sortDD: Locator = this.page.getByTestId('sort');

    async openProduct(productName: string): Promise<void> {
        await this.productsCard.filter({ hasText: productName }).first().click();
    }

    async getProductDetails(productName: string): Promise<{
        title: string;
        price: string;
    }> {

        const productTitle: string = await this.productLocator(productName).getByTestId('product-name').innerText();
        const productPrice: string = await this.productLocator(productName).getByTestId('product-price').innerText();

        return {
            title: productTitle,
            price: productPrice.replace('$', '').trim(),
        };
    }

    async selectSortBy (value: string) {
        await this.sortDD.click();
        await this.sortDD.selectOption(`${value}`);
        await this.page.waitForLoadState('networkidle');
    }

    async getProductsSorted(productName: Locator, order: 'asc' | 'desc') {
        const productNames: string[] = await productName.allTextContents();
        const sorted: string[] = [...productNames].sort((a, b) => a.localeCompare(b));

        if (order === 'desc') {
            sorted.reverse();
        }
        return sorted;
    }

    async selectCategoryCheckbox (name: string) {
        await this.page.getByRole('checkbox', {name: `${name}`}).click();
        await this.page.waitForLoadState('networkidle');
    }
}
