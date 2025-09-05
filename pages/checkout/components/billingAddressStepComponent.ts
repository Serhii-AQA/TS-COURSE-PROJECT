import { Locator } from '@playwright/test';
import { BasePage } from '../../basePage';

export interface BillingAddress {
	street: string;
	city: string;
	state: string;
	country: string;
	postcode: string;
}

export class BillingAddressStepComponent extends BasePage {
	readonly signInCircleIcon: Locator = this.page.getByText('2');
	readonly streetField: Locator = this.page.getByTestId('street');
	readonly cityField: Locator = this.page.getByTestId('city');
	readonly stateField: Locator = this.page.getByTestId('state');
	readonly countryField: Locator = this.page.getByTestId('country');
	readonly postcodeField: Locator = this.page.getByTestId('postal_code');
	readonly proceedToCheckoutButton: Locator = this.page.getByTestId('proceed-3');

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
