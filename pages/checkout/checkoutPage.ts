import { BasePage } from '../basePage';
import { Locator } from 'playwright-core';
import { BillingAddressStepComponent } from './components/billingAddressStepComponent';
import { SignInStepComponent } from './components/signInStepComponent';
import { PaymentStepComponent } from './components/paymentStepComponent';

export class CheckoutPage extends BasePage {
    readonly signInStep: SignInStepComponent = new SignInStepComponent(this.page);
    readonly billingAddressStep: BillingAddressStepComponent = new BillingAddressStepComponent(this.page);
    readonly paymentStep: PaymentStepComponent = new PaymentStepComponent(this.page);

    readonly productQuantityField: Locator = this.page.getByTestId('product-quantity');
    readonly productTitle: Locator = this.page.getByTestId('product-title');
    readonly productPrice: Locator = this.page.getByTestId('product-price');
    readonly totalPrice: Locator = this.page.getByTestId('cart-total');
    readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-1');
}
