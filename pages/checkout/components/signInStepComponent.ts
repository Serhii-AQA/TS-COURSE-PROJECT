import { Locator } from '@playwright/test';
import { BasePage } from '../../basePage';

export class SignInStepComponent extends BasePage {
	readonly successfulSignInMessage: Locator = this.page.locator('div.container p');
	readonly proceedToCheckout2Button: Locator = this.page.getByTestId('proceed-2');

	async proceedToCheckout(): Promise<void> {
		await this.proceedToCheckoutButton.click();
	}
}
