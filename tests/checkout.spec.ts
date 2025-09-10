import { test } from '../fixtures';
import { WebRoutes } from '../constants/webRoutes';
import { USER_NAME } from '../config/baseConfig';
import { BillingAddressEnum } from '../constants/billing';
import { PaymentData, PaymentMethodEnum } from '../constants/payments';
import { getFutureExpirationDate } from '../utils/dateUtils';
import { AlertsEnum } from '../constants/alerts';
import { BillingAddress } from '../pages/checkout/components/billingAddressStepComponent';
import { PaymentFields } from '../pages/checkout/components/paymentStepComponent';
import { expect } from '@playwright/test';

const billingAddress: BillingAddress = {
    street: BillingAddressEnum.STREET,
    city: BillingAddressEnum.CITY,
    state: BillingAddressEnum.STATE,
    country: BillingAddressEnum.COUNTRY,
    postcode: BillingAddressEnum.POSTCODE,
};

const creditCardData: PaymentFields = {
    creditCardNumber: PaymentData.CREDIT_CARD_NUMBER,
    expirationDate: getFutureExpirationDate(3),
    cvv: PaymentData.CVV,
    cardHolderName: USER_NAME,
};

test.describe('Checkout flow', {
    tag: ['@regression', '@smoke'],
}, () => {
    test('checkout first product with credit card', async ({ loggedInUser }) => {

        await test.step('Navigate to home and open first product', async () => {
            await loggedInUser.loginPage.navigateTo(WebRoutes.Home);
            await loggedInUser.homePage.productsCard.first().click();
            await loggedInUser.homePage.openProduct(1);
        });

        const productDetails = await test.step('Get product details', async () => {
            return await loggedInUser.productDetailsPage.getProductInfo();
        });

        await test.step('Add product to cart and open checkout', async () => {
            await loggedInUser.productDetailsPage.addToCartButton.click();
            await loggedInUser.productDetailsPage.alertsComponent.productAddedAlert.click();
            await loggedInUser.productDetailsPage.headerComponent.cartItem.click();
            await expect(loggedInUser.checkoutPage.productTitle).toHaveText(productDetails.title);
        });

        await test.step('Verify product price and total price', async () => {
            const productPrice: string = (await loggedInUser.checkoutPage.productPrice.innerText()).replace('$', '').trim();
            expect(productPrice).toEqual(productDetails.price);

            const totalPrice: string = (await loggedInUser.checkoutPage.totalPrice.innerText()).replace('$', '').trim();
            expect(totalPrice).toEqual(productDetails.price);
        });

        await test.step('Proceed to checkout and verify account name', async () => {
            await loggedInUser.checkoutPage.proceedToCheckoutButton.click();
            await expect(
                loggedInUser.checkoutPage.headerComponent.accountName,
                'User name is not visible',
            ).toHaveText(USER_NAME);
        });

        await test.step('Complete sign in step', async () => {
            await loggedInUser.checkoutPage.signInStep.proceedToCheckout();
            await expect(loggedInUser.checkoutPage.billingAddressStep.signInCircleIcon)
                .toHaveCSS('background-color', 'rgb(51, 153, 51)');
        });

        await test.step('Fill billing address and proceed', async () => {
            await loggedInUser.checkoutPage.billingAddressStep.fillBillingAddress(billingAddress);
            await loggedInUser.checkoutPage.billingAddressStep.proceedToCheckoutButton.click();
        });

        await test.step('Fill payment data and complete checkout', async () => {
            await loggedInUser.checkoutPage.paymentStep.selectPaymentMethod(PaymentMethodEnum.CREDIT_CARD);
            await loggedInUser.checkoutPage.paymentStep.fillPaymentData(creditCardData);
            await loggedInUser.checkoutPage.paymentStep.proceedToCheckout();
        });

        await test.step('Verify payment success', async () => {
            await expect(loggedInUser.productDetailsPage.alertsComponent.paymentWasSuccessfulAlert)
                .toHaveText(AlertsEnum.PAYMENT_WAS_SUCCESSFUL);
        });
    });
});
