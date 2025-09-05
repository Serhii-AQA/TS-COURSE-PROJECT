import { test } from '../fixtures';
import { WebRoutes } from '../constants/webRoutes';
import { expect } from '@playwright/test';
import { USER_NAME } from '../config/baseConfig';
import { BillingAddressEnum } from '../constants/billing';
import { BillingAddress, PaymentFields } from '../pages/checkout/checkoutPage';
import { PaymentData, PaymentMethodEnum } from '../constants/payments';
import { getFutureExpirationDate } from '../utils/dateUtils';
import { AlertsEnum } from '../constants/alerts';

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

test.describe('Checkout flow', () => {
    test('checkout first product with credit card', async ({ apiLogIn }) => {
        await apiLogIn.loginPage.navigateTo(WebRoutes.Home);
        await apiLogIn.homePage.productsCard.first().click();
        await apiLogIn.homePage.openProduct(1);
        const productDetails = await apiLogIn.productDetailsPage.getProductInfo();
        await apiLogIn.productDetailsPage.addToCartButton.click();
        await apiLogIn.productDetailsPage.alertsComponent.productAddedAlert.click();
        await apiLogIn.productDetailsPage.headerComponent.cartItem.click();
        await expect(apiLogIn.checkoutPage.productTitle).toHaveText(productDetails.title);

        const productPrice: string = ( await apiLogIn.checkoutPage.productPrice.innerText() ).replace('$', '').trim();
        expect(productPrice).toEqual(productDetails.price);

        const totalPrice: string = ( await apiLogIn.checkoutPage.totalPrice.innerText()).replace('$', '').trim();
        expect(totalPrice).toEqual(productDetails.price);

        await apiLogIn.checkoutPage.proceedToCheckoutButton.click();
        await expect(apiLogIn.checkoutPage.headerComponent.accountName,
            'User name is not visible',
        ).toHaveText(USER_NAME);

        await apiLogIn.checkoutPage.proceedToCheckout2Button.click();
        await expect(apiLogIn.checkoutPage.signInCircleIcon).toHaveCSS('background-color', 'rgb(51, 153, 51)');

        await apiLogIn.checkoutPage.fillBillingAddress(billingAddress);
        await apiLogIn.checkoutPage.proceedToCheckout3Button.click();
        await apiLogIn.checkoutPage.selectPaymentMethod(PaymentMethodEnum.CREDIT_CARD);
        await apiLogIn.checkoutPage.fillPaymentData(creditCardData);
        await apiLogIn.checkoutPage.finishButton.click();
        await expect(apiLogIn.productDetailsPage.alertsComponent.paymentWasSuccessfulAlert).toHaveText(AlertsEnum.PAYMENT_WAS_SUCCESSFUL);
    });
});
