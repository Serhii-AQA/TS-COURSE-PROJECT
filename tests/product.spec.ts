
import {expect, test} from "@playwright/test";
import {Application} from "../pages/app";
import {SortValueEnum, SortTypeEnum} from "../constants/sort";
import {CategoryOtherEnum} from "../constants/Categories";

test.describe('Products', () => {
    test('Verify user can view product details', async ({page}) => {
        const app = new Application(page);
        const productTitle = 'Combination Pliers';

        await app.home.navigateTo('/');
        await expect(app.home.productsCard).not.toHaveCount(0);

        const productDetails: {title: string, price: string} = await app.home.getProductDetails(productTitle);
        await app.home.openProduct(productTitle);

        await expect(page).toHaveURL(/.*\/product\/.*/);

        await expect(
            app.productDetails.productName,
            'Product name is not visible',
        ).toHaveText(productDetails.title);
        await expect(
            app.productDetails.productPrice,
            'Product price is not visible',
        ).toHaveText(productDetails.price);
        await expect(
            app.productDetails.addToCartButton,
            'Add to cart button is not visible',
        ).toBeVisible();
        await expect(
            app.productDetails.addToFavoritesButton,
            'Add to favorites button is not visible',
        ).toBeVisible();
    });

    test('Verify user can add product to cart', async ({ page }) => {
        const app = new Application(page);
        const productName: string = 'Slip Joint Pliers';
        const textAllert: string = 'Product added to shopping cart.';

        await app.home.navigateTo('/');
        const productDetails: {title: string, price: string} = await app.home.getProductDetails(productName);
        await app.home.openProduct(productName);
        await expect(page).toHaveURL(/^https:\/\/practicesoftwaretesting.com\/product/);
        await expect(app.productDetails.productName, 'Product name is not visible').toHaveText(productDetails.title);
        await expect(app.productDetails.productPrice, 'Product price is not visible').toHaveText(productDetails.price);

        await app.productDetails.addToCartButton.click();
        await expect(app.productDetails.productAddedAlertMessage).toBeVisible();

        const alertMessage: string = await app.productDetails.getTextElement(app.productDetails.productAddedAlertMessage);
        expect(alertMessage).toEqual(textAllert);
        await expect(app.productDetails.productAddedAlertMessage).not.toBeVisible({ timeout: 8_000 });

        const countCart: string = await app.productDetails.getTextElement(app.header.cartItem);
        expect(countCart,'Count to cart  is not 1').toEqual('1');

        await app.header.cartItem.click()
        await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
        await expect(app.checkout.productQuantityField).toHaveValue('1');

        const productTitleOnTable: string = (await app.checkout.getTextElement(app.checkout.productTitle)).trim();
        expect(productTitleOnTable).toEqual(productDetails.title);
        await expect(app.checkout.proceedToCheckoutButton).toBeVisible();
    });

    const sortNameData = [
        {
            name: SortTypeEnum.ASC_NAME,
            value: SortValueEnum.ASC_NAME,
        },
        {
            name: SortTypeEnum.DESC_NAME,
            value: SortValueEnum.DESC_NANE,
        },
    ]

    for(const testData of  sortNameData) {
        test(`Verify user can perform sorting by name ${testData.name}`, async ({page}) => {
            const app = new Application(page);

            await app.home.navigateTo('/');

            await Promise.all([
                page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
                app.home.selectSortBy(testData.value),
            ]);

            const products: string[] = await app.home.productName.allTextContents();
            const sortingProducts: string[] = await app.home.getProductsSorted(app.home.productName, testData.name);
            expect(products).toEqual(sortingProducts)
        });
    }

    const sortPriceData = [
        {
            name: SortTypeEnum.ASC_NAME,
            value: SortValueEnum.ASC_PRICE,
        },
        {
            name: SortTypeEnum.DESC_NAME,
            value: SortValueEnum.DESC_PRICE,
        },
    ]

    for(const testData of  sortPriceData) {
        test(`Verify user can perform sorting by price ${testData.name}`, async ({page}) => {
            const app = new Application(page);

            await app.home.navigateTo('/');

            await Promise.all([
                page.waitForResponse(res => res.url().includes('/products') && res.status() === 200),
                app.home.selectSortBy(testData.value),
            ]);

            const products: string[] = await app.home.productPrice.allTextContents();
            const sortingProducts: string[] = await app.home.getProductsSorted(app.home.productPrice, testData.name);
            expect(products).toEqual(sortingProducts)
        });
    }

    test('Verify user can filter products by category', async ({page}) => {
        const app = new Application(page);

        await app.home.navigateTo('/');
        await app.home.selectCategoryCheckbox(CategoryOtherEnum.SANDER);
        const productNames: string[] = await app.home.productName.allTextContents();
        expect(productNames.every(name => name.includes(CategoryOtherEnum.SANDER))).toBeTruthy();
    });
});
