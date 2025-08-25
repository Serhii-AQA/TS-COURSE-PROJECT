import {Page} from "playwright-core";
import {LoginPage} from "./loginPage";
import {AccountPage} from "./accountPage";
import {HomePage} from "./homePage";
import {ProductDetailsPage} from "./productDetailsPage";
import {CheckoutPage} from "./checkoutPage";

export class Application {
    private readonly page: Page;
    readonly homePage: HomePage;
    readonly loginPage: LoginPage;
    readonly accountPage: AccountPage;
    readonly productDetailsPage: ProductDetailsPage;
    readonly checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.accountPage = new AccountPage(this.page);
        this.productDetailsPage = new ProductDetailsPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }
}
