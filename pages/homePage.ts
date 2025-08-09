import { BasePage } from "./basePage";
import { Locator } from "playwright-core";

export class HomePage extends BasePage {
    readonly productsCard: Locator = this.page.getByTestId(/product/);
    readonly productLocator = (productName: string, num: number) =>  this.productsCard.filter({ hasText: productName }).nth(num);

    async openProduct(productName: string): Promise<void> {
        await this.productsCard.filter({ hasText: productName }).first().click();
    }

    async getProductDetails(productName: string, num: number): Promise<{
        title: string;
        price: string;
    }> {

        const productTitle: string = await this.productLocator(productName, num).getByTestId('product-name').innerText();
        const productPrice: string = await this.productLocator(productName, num).getByTestId('product-price').innerText();

        return {
            title: productTitle,
            price: productPrice.replace('$', '').trim(),
        };
    }
}