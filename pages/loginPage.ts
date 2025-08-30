import { Locator } from 'playwright-core';
import { BasePage } from './basePage';

export class LoginPage extends BasePage{
    readonly emailField: Locator = this.page.getByTestId('email');
    readonly passwordField: Locator = this.page.getByTestId('password');
    readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

    async loginAs(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}
