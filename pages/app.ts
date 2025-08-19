import {Page} from "playwright-core";
import {LoginPage} from "./loginPage";
import {AccountPage} from "./accountPage";
import {HomePage} from "./homePage";
import {ProductDetailsPage} from "./productDetailsPage";
import {HeaderComponent} from "./component/headerComponent";
import {CheckoutPage} from "./checkoutPage";

export class Application {
    private readonly page: Page;
    readonly home: HomePage;
    readonly login: LoginPage;
    readonly account: AccountPage;
    readonly productDetails: ProductDetailsPage;
    readonly header: HeaderComponent;
    readonly checkout: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.home = new HomePage(this.page);
        this.login = new LoginPage(this.page);
        this.account = new AccountPage(this.page);
        this.productDetails = new ProductDetailsPage(this.page);
        this.header = new HeaderComponent(this.page);
        this.checkout = new CheckoutPage(this.page);
    }
}
