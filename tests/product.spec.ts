import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { SortTypeEnum, SortValueEnum } from '../constants/sort';
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

        await test.step('Navigate to Home page', async () => {
            await app.homePage.navigateTo(WebRoutes.Home);
            await expect(app.homePage.productsCard).not.toHaveCount(0);
        });

        let productDetails: { title: string; price: string };
        await test.step('Get product details', async () => {
            productDetails = await app.homePage.getProductDetails(productTitle);
        });

        await test.step('Open product details page', async () => {
            await app.homePage.openProduct(productTitle);
            await expect(app.page).toHaveURL(/.*\/product\/.*/);
        });

        await test.step('Verify product details are visible', async () => {
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

    test('Verify user can add product to cart', async ({ app }) => {
        const productName: string = 'Slip Joint Pliers';
        const textAlert: string = 'Product added to shopping cart.';

        await test.step('Navigate to home page', async () => {
            await app.homePage.navigateTo(WebRoutes.Home);
        });

        let productDetails: { title: string; price: string };
        await test.step('Get product details', async () => {
            productDetails = await app.homePage.getProductDetails(productName);
        });

        await test.step('Open product details page and verify info', async () => {
            await app.homePage.openProduct(productName);
            await expect(app.page).toHaveURL(/^https:\/\/practicesoftwaretesting.com\/product/);
            await expect(app.productDetailsPage.productName, 'Product name is not visible')
                .toHaveText(productDetails.title);
            await expect(app.productDetailsPage.productPrice, 'Product price is not visible')
                .toHaveText(productDetails.price);
        });

        await test.step('Add product to cart and verify alert', async () => {
            await app.productDetailsPage.addToCartButton.click();
            await expect(app.productDetailsPage.alertsComponent.productAddedAlert).toBeVisible();
            await expect(app.productDetailsPage.alertsComponent.productAddedAlert)
                .toHaveText(textAlert, { useInnerText: true });
            await expect(app.productDetailsPage.alertsComponent.productAddedAlert)
                .not.toBeVisible({ timeout: 8_000 });
        });

        await test.step('Verify cart item count', async () => {
            await expect(app.productDetailsPage.headerComponent.cartItem, 'Count in cart is not 1')
                .toHaveText('1', { useInnerText: true });
        });

        await test.step('Go to checkout page and verify order', async () => {
            await app.productDetailsPage.headerComponent.cartItem.click();
            await expect(app.page).toHaveURL(WebRoutes.Checkout);
            await expect(app.checkoutPage.productQuantityField).toHaveValue('1');
            await expect(app.checkoutPage.productTitle).toHaveText(productDetails.title);
            await expect(app.checkoutPage.proceedToCheckoutButton).toBeVisible();
        });
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

    for (const testData of sortNameData) {
        test(`Verify user can perform sorting by name ${testData.name}`, async ({ app, request }) => {

            await test.step('Navigate to Home page', async () => {
                await app.homePage.navigateTo(WebRoutes.Home);
            });

            await test.step(`Select sort option: ${testData.value}`, async () => {
                await app.homePage.selectSortBy(testData.value);
            });

            await test.step('Wait for Products API response', async () => {
                await waitForApiStatus(request, WebRoutes.Products);
            });

            await test.step('Get sorted product names', async () => {
                const sortingProducts: string[] = await app.homePage.getProductsSorted(app.homePage.productName, testData.name);
                await expect(app.homePage.productName).toHaveText(sortingProducts);
            });

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

    for (const testData of sortPriceData) {
        test(`Verify user can perform sorting by price ${testData.name}`, async ({ app, request }) => {

            await test.step('Navigate to Home page', async () => {
                await app.homePage.navigateTo(WebRoutes.Home);
            });

            await test.step(`Select sort option: ${testData.value}`, async () => {
                await app.homePage.selectSortBy(testData.value);
            });

            await test.step('Wait for API Products response', async () => {
                await waitForApiStatus(request, WebRoutes.Products);
            });

            await test.step(`Get sorted products by ${testData.name}`, async () => {
                const sortingProducts: string[] = await app.homePage.getProductsSorted(app.homePage.productPrice, testData.name);

                await expect(app.homePage.productPrice).toHaveText(sortingProducts);
            });

        });
    }

    test('Verify user can filter products by category', async ({ app }) => {
        await test.step('Navigate to Home page', async () => {
            await app.homePage.navigateTo(WebRoutes.Home);
        });

        await test.step(`Select category: ${CategoryOtherEnum.SANDER}`, async () => {
            await app.homePage.selectCategoryCheckbox(CategoryOtherEnum.SANDER);
        });

        await test.step('Verify only products from selected category are shown', async () => {
            const productNames: string[] = await app.homePage.productName.allTextContents();
            expect(productNames.every(name => name.includes(CategoryOtherEnum.SANDER))).toBeTruthy();
        });
    });

    test('Verify mock response with 20-th products', async ({ app }) => {
        await app.page.route(
            `${API_BASE_URL}${WebRoutes.Products}*`,
            mockProductsResponse
        );
        await test.step('Check that mock 20 products have appeared on the home page', async () => {
            await app.homePage.navigateTo(WebRoutes.Home);
            await expect(app.homePage.productName).toHaveCount(20);
        });
    });
});
