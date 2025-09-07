import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { SortValueEnum, SortTypeEnum } from '../constants/sort';
import { CategoryOtherEnum } from '../constants/categories';
import { waitForApiStatus } from '../utils/apiUtils';
import { WebRoutes } from '../constants/webRoutes';
import { mockProductsResponse } from '../utils/mockUtils';
import { API_BASE_URL } from '../config/baseConfig';

test.describe('Products', {
    tag: '@regression',
},() => {
    test('Verify user can view product details', async ({ app }) => {
        const productTitle = 'Combination Pliers';

        await app.homePage.navigateTo(WebRoutes.Home);
        await expect(app.homePage.productsCard).not.toHaveCount(0);

        const productDetails: {title: string, price: string} = await app.homePage.getProductDetails(productTitle);
        await app.homePage.openProduct(productTitle);

        await expect(app.page).toHaveURL(/.*\/product\/.*/);

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

    test('Verify user can add product to cart', async ({ app }) => {
        const productName: string = 'Slip Joint Pliers';
        const textAllert: string = 'Product added to shopping cart.';

        await app.homePage.navigateTo(WebRoutes.Home);
        const productDetails: {title: string, price: string} = await app.homePage.getProductDetails(productName);
        await app.homePage.openProduct(productName);
        await expect(app.page).toHaveURL(/^https:\/\/practicesoftwaretesting.com\/product/);
        await expect(app.productDetailsPage.productName, 'Product name is not visible').toHaveText(productDetails.title);
        await expect(app.productDetailsPage.productPrice, 'Product price is not visible').toHaveText(productDetails.price);

        await app.productDetailsPage.addToCartButton.click();
        await expect(app.productDetailsPage.alertsComponent.productAddedAlert).toBeVisible();
        await expect(app.productDetailsPage.alertsComponent.productAddedAlert).toHaveText(textAllert, { useInnerText: true });
        await expect(app.productDetailsPage.alertsComponent.productAddedAlert).not.toBeVisible({ timeout: 8_000 });
        await expect(app.productDetailsPage.headerComponent.cartItem,'Count to cart  is not 1').toHaveText('1', { useInnerText: true });

        await app.productDetailsPage.headerComponent.cartItem.click();
        await expect(app.page).toHaveURL(WebRoutes.Checkout);
        await expect(app.checkoutPage.productQuantityField).toHaveValue('1');
        await expect(app.checkoutPage.productTitle).toHaveText(productDetails.title);
        await expect(app.checkoutPage.proceedToCheckoutButton).toBeVisible();
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
    ];

    for(const testData of  sortNameData) {
        test(`Verify user can perform sorting by name ${testData.name}`, async ({ app, request }) => {
            await app.homePage.navigateTo(WebRoutes.Home);
            await app.homePage.selectSortBy(testData.value);
            await waitForApiStatus(request, WebRoutes.Products);

            const sortingProducts: string[] = await app.homePage.getProductsSorted(app.homePage.productName, testData.name);
            await expect(app.homePage.productName).toHaveText(sortingProducts);
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
    ];

    for(const testData of  sortPriceData) {
        test(`Verify user can perform sorting by price ${testData.name}`, async ({ app, request }) => {
            await app.homePage.navigateTo(WebRoutes.Home);
            await app.homePage.selectSortBy(testData.value);
            await waitForApiStatus(request, WebRoutes.Products);
            const sortingProducts: string[] = await app.homePage.getProductsSorted(app.homePage.productPrice, testData.name);
            await expect(app.homePage.productPrice).toHaveText(sortingProducts);
        });
    }

    test('Verify user can filter products by category', async ({ app }) => {
        await app.homePage.navigateTo(WebRoutes.Home);
        await app.homePage.selectCategoryCheckbox(CategoryOtherEnum.SANDER);
        const productNames: string[] = await app.homePage.productName.allTextContents();
        expect(productNames.every(name => name.includes(CategoryOtherEnum.SANDER))).toBeTruthy();
    });

    test('Verify mock response with 20-th products', async ({ app }) => {
        await app.page.route(
            `${API_BASE_URL}${WebRoutes.Products}*`,
            mockProductsResponse
        );

        await app.homePage.navigateTo(WebRoutes.Home);
        await expect(app.homePage.productName).toHaveCount(20);
    });
});
