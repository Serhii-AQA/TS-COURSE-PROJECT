import { expect, loggedInUser as test } from '../fixtures';
import { WebRoutes } from '../constants/webRoutes';
import { USER_NAME } from '../config/baseConfig';
import { BillingAddressEnum } from '../constants/billing';
import { PaymentData, PaymentMethodEnum } from '../constants/payments';
import { getFutureExpirationDate } from '../utils/dateUtils';
import { AlertsEnum } from '../constants/alerts';
import { BillingAddress } from '../pages/checkout/components/billingAddressStepComponent';
import { PaymentFields } from '../pages/checkout/components/paymentStepComponent';

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
    test('checkout first product with credit card', async ({ app }) => {
        await app.loginPage.navigateTo(WebRoutes.Home);
        await app.homePage.productsCard.first().click();
        await app.homePage.openProduct(1);
        const productDetails = await app.productDetailsPage.getProductInfo();
        await app.productDetailsPage.addToCartButton.click();
        await app.productDetailsPage.alertsComponent.productAddedAlert.click();
        await app.productDetailsPage.headerComponent.cartItem.click();
        await expect(app.checkoutPage.productTitle).toHaveText(productDetails.title);

        const productPrice: string = ( await app.checkoutPage.productPrice.innerText() ).replace('$', '').trim();
        expect(productPrice).toEqual(productDetails.price);

        const totalPrice: string = ( await app.checkoutPage.totalPrice.innerText()).replace('$', '').trim();
        expect(totalPrice).toEqual(productDetails.price);

        await app.checkoutPage.proceedToCheckoutButton.click();
        await expect(app.checkoutPage.headerComponent.accountName,
            'User name is not visible',
        ).toHaveText(USER_NAME);

        await app.checkoutPage.signInStep.proceedToCheckout();
        await expect(app.checkoutPage.billingAddressStep.signInCircleIcon).toHaveCSS('background-color', 'rgb(51, 153, 51)');

        await app.checkoutPage.billingAddressStep.fillBillingAddress(billingAddress);
        await app.checkoutPage.billingAddressStep.proceedToCheckoutButton.click();
        await app.checkoutPage.paymentStep.selectPaymentMethod(PaymentMethodEnum.CREDIT_CARD);
        await app.checkoutPage.paymentStep.fillPaymentData(creditCardData);
        await app.checkoutPage.paymentStep.proceedToCheckout();
        await expect(app.productDetailsPage.alertsComponent.paymentWasSuccessfulAlert).toHaveText(AlertsEnum.PAYMENT_WAS_SUCCESSFUL);
    });
});
