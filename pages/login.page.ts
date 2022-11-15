import { expect, Locator, Page} from '@playwright/test';

export class loginPage{
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

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginStandardUser()
    {
        await this.inputUsername.fill('standard_user');
        await this.inputPassword.fill('secret_sauce');
        await this.loginBtn.click();
    }

    async loginLockedOutUser()
    {
        await this.inputUsername.fill('locked_out_user');
        await this.inputPassword.fill('secret_sauce');
        await this.loginBtn.click();
    }

    async loginProblemUser()
    {
        await this.inputUsername.fill('problem_user');
        await this.inputPassword.fill('secret_sauce');
        await this.loginBtn.click();
    }

    async loginGlichUser()
    {
        await this.inputUsername.fill('performance_glitch_user');
        await this.inputPassword.fill('secret_sauce');
        await this.loginBtn.click();
    }
}
