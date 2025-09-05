import { Locator } from '@playwright/test';
import { BillingAddress } from '../checkoutPage';
import { BasePage } from '../../basePage';

export class BillingAddressStepComponent extends BasePage {
	readonly streetInput: Locator = this.page.getByTestId('street');
	readonly cityInput: Locator = this.page.getByTestId('city');
	readonly stateInput: Locator = this.page.getByTestId('state');
	readonly countryInput: Locator = this.page.getByTestId('country');
	readonly zipCodeInput: Locator = this.page.getByTestId('postal_code');
	readonly streetField: Locator = this.page.getByTestId('street');
	readonly cityField: Locator = this.page.getByTestId('city');
	readonly stateField: Locator = this.page.getByTestId('state');
	readonly countryField: Locator = this.page.getByTestId('country');
	readonly postcodeField: Locator = this.page.getByTestId('postal_code');
	readonly proceedToCheckout3Button: Locator = this.page.getByTestId('proceed-3');

	async fillBillingAddress(billingAddress: BillingAddress): Promise<void> {
		const { street, city, state, country, postcode } = billingAddress;
		await this.streetField.clear();
		await this.streetField.pressSequentially(street);

		await this.cityField.clear();
		await this.cityField.pressSequentially(city);

		await this.stateField.clear();
		await this.stateField.pressSequentially(state);

		await this.countryField.clear();
		await this.countryField.pressSequentially(country);

		await this.postcodeField.clear();
		await this.postcodeField.pressSequentially(postcode);
	}
}
