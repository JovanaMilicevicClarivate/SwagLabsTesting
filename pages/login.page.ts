import { expect, Locator, Page} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.locator('#user-name');
        this.inputPassword = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async goToLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginUsers(username:string, password)
    {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.loginBtn.click();
    }

}
