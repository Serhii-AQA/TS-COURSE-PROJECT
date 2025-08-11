import {Page} from "playwright-core";
import {LoginPage} from "./loginPage";
import {AccountPage} from "./accountPage";
import {HomePage} from "./homePage";
import {ProductDetailsPage} from "./productDetailsPage";

export class Application {
    private readonly page: Page;
    readonly home: HomePage;
    readonly login: LoginPage;
    readonly account: AccountPage;
    readonly productDetails: ProductDetailsPage;

    constructor(page: Page) {
        this.page = page;
        this.home = new HomePage(this.page);
        this.login = new LoginPage(this.page);
        this.account = new AccountPage(this.page);
        this.productDetails = new ProductDetailsPage(this.page);
    }
}
