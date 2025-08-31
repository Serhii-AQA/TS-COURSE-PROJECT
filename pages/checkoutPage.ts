import { BasePage } from './basePage';
import { Locator } from 'playwright-core';

export interface BillingAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
}

export interface PaymentFields {
    creditCardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
}

export class CheckoutPage extends BasePage {
    readonly productQuantityField: Locator = this.page.getByTestId('product-quantity');
    readonly productTitle: Locator = this.page.getByTestId('product-title');
    readonly productPrice: Locator = this.page.getByTestId('product-price');
    readonly totalPrice: Locator = this.page.getByTestId('cart-total');
    readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
    readonly proceedToCheckout2Button: Locator = this.page.getByTestId('proceed-2');
    readonly proceedToCheckout3Button: Locator = this.page.getByTestId('proceed-3');
    readonly streetField: Locator = this.page.getByTestId('street');
    readonly cityField: Locator = this.page.getByTestId('city');
    readonly stateField: Locator = this.page.getByTestId('state');
    readonly countryField: Locator = this.page.getByTestId('country');
    readonly postcodeField: Locator = this.page.getByTestId('postal_code');
    readonly signInCircleIcon: Locator = this.page.getByText('2');
    readonly paymentMethodDD: Locator = this.page.getByTestId('payment-method');
    readonly creditCardNumberField: Locator = this.page.getByTestId('credit_card_number');
    readonly expirationDateField: Locator = this.page.getByTestId('expiration_date');
    readonly cvvField: Locator = this.page.getByTestId('cvv');
    readonly cardHolderNameField: Locator = this.page.getByTestId('card_holder_name');
    readonly finishButton: Locator = this.page.getByTestId('finish');

    async selectPaymentMethod(value: string): Promise<void> {
        await this.paymentMethodDD.selectOption(value);
    }

    async fillBillingAddress(billingAddress: BillingAddress): Promise<void> {
        await this.streetField.clear();
        await this.streetField.fill(billingAddress.street);

        await this.cityField.clear();
        await this.cityField.fill(billingAddress.city);

        await this.stateField.clear();
        await this.stateField.fill(billingAddress.state);

        await this.countryField.clear();
        await this.countryField.fill(billingAddress.country);

        await this.postcodeField.clear();
        await this.postcodeField.fill(billingAddress.postcode);
    }
    async fillPaymentData(PaymentFields: PaymentFields): Promise<void> {
        await this.creditCardNumberField.fill(PaymentFields.creditCardNumber);
        await this.expirationDateField.fill(PaymentFields.expirationDate);
        await this.cvvField.fill(PaymentFields.cvv);
        await this.cardHolderNameField.fill(PaymentFields.cardHolderName);
    }
}
