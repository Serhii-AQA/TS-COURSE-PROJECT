import { Locator } from '@playwright/test';
import { BasePage } from '../../basePage';
import { PaymentMethodEnum } from '../../../constants/payments';

export interface PaymentFields {
	creditCardNumber: string;
	expirationDate: string;
	cvv: string;
	cardHolderName: string;
}

export class PaymentStepComponent extends BasePage {
	readonly paymentMethodDropdown: Locator = this.page.getByTestId('payment-method');
	readonly confirmButton: Locator = this.page.getByTestId('finish');
	readonly creditCardNumberField: Locator = this.page.getByTestId('credit_card_number');
	readonly expirationDateField: Locator = this.page.getByTestId('expiration_date');
	readonly cvvField: Locator = this.page.getByTestId('cvv');
	readonly cardHolderNameField: Locator = this.page.getByTestId('card_holder_name');

	async selectPaymentMethod(paymentMethod: PaymentMethodEnum): Promise<void> {
		await this.paymentMethodDropdown.selectOption(paymentMethod);
	}

	async fillPaymentData(PaymentFields: PaymentFields): Promise<void> {
		const { creditCardNumber, expirationDate, cvv, cardHolderName } = PaymentFields;
		await this.creditCardNumberField.fill(creditCardNumber);
		await this.expirationDateField.fill(expirationDate);
		await this.cvvField.fill(cvv);
		await this.cardHolderNameField.fill(cardHolderName);
	}

	async proceedToCheckout(): Promise<void> {
		await this.confirmButton.click();
	}
}
