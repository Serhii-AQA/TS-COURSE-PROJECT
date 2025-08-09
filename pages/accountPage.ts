import { Locator } from "playwright-core";
import { HeaderComponent } from "./component/headerComponent";
import { BasePage } from "./basePage";

export class AccountPage extends BasePage{
    readonly title: Locator = this.page.getByTestId('page-title');
    readonly header: HeaderComponent = new HeaderComponent(this.page);
}
