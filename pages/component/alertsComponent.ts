import { Locator, Page } from 'playwright-core';

export class AlertsComponent {
	readonly page: Page;
	readonly productAddedAlert: Locator;
	readonly paymentWasSuccessfulAlert: Locator;

	constructor(page: Page) {
		this.page = page;
		this.productAddedAlert = this.page.getByRole('alert', { name:'Product added to shopping cart.' });
		this.paymentWasSuccessfulAlert = this.page.getByTestId('payment-success-message');
	}
}