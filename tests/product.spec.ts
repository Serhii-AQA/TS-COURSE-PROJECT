
import {expect, test} from "@playwright/test";
import {ApplicationPage} from "../pages/appPage";

test.describe('Products', () => {
    test('Verify user can view product details', async ({page}) => {
        const app = new ApplicationPage(page);
        const productTitle = 'Combination Pliers';

        await app.home.navigateTo('/');
        await expect(app.home.productsCard).not.toHaveCount(0);

        const productDetails = await app.home.getProductDetails(productTitle, 0);
        await app.home.openProduct(productTitle);

        await expect(page).toHaveURL(/.*\/product\/.*/);

        await expect(
            app.productDetailsPage.productName,
            'Product name is not visible',
        ).toHaveText(productDetails.title);
        await expect(
            app.productDetailsPage.productPrice,
            'Product price is not visible',
        ).toHaveText(productDetails.price);
        await expect(
            app.productDetailsPage.addToCartButton,
            'Add to cart button is not visible',
        ).toBeVisible();
        await expect(
            app.productDetailsPage.addToFavoritesButton,
            'Add to favorites button is not visible',
        ).toBeVisible();
    });
});
