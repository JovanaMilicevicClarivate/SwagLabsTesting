//pageObjectModel.page.ts
import { expect, Locator, Page} from '@playwright/test';

export class pageObjectModel {
readonly page: Page;
readonly inputUser: Locator;
readonly inputPass: Locator;
readonly loginBtn: Locator;
readonly addJacket: Locator;
readonly cart: Locator;
readonly menuButton: Locator;
readonly menu: Locator;
readonly filter: Locator;
readonly bikeLightImg: Locator;
readonly backFromProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUser = page.locator('#user-name');
        this.inputPass = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.addJacket = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
        this.cart = page.locator('#shopping_cart_container');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.menu = page.locator('.bm-menu-wrap');
        this.filter = page.locator('.product_sort_container');
        this.bikeLightImg = page.locator('#item_0_img_link');
        this.backFromProduct = page.locator('#back-to-products');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async logInStandard()
    {
        await this.inputUser.fill('standard_user');
        await this.inputPass.fill('secret_sauce');
        await this.loginBtn.click();
        await expect(this.page).toHaveURL(/.*inventory/);
    }
    async logInLockedOut()
    {
        await this.inputUser.fill('locked_out_user');
        await this.inputPass.fill('secret_sauce');
        await this.loginBtn.click();

        await expect(this.page.getByText('Epic sadface: Sorry, this user has been locked out')).toBeVisible();
    }
    async addFleeceJacket()
    {
        await this.addJacket.click();
        await expect(this.addJacket).toBeHidden();
    }

    async openCart()
    {
        await this.cart.click();
        await expect(this.page).toHaveURL(/.*cart/);
    }

    async backFromCart()
    {
        await this.page.locator('#continue-shopping').click();
        await expect(this.page).toHaveURL(/.*inventory/);
    }

    async openMenu()
    {
        await expect(this.menu).toBeHidden();
        await this.menuButton.click()
        await expect(this.menu).toBeVisible();
    }
    async closeMenu()
    {
        //da li moze da se koristi if
        await this.menuButton.click();
        await expect(this.menu).toBeHidden();
    }

    async filterHighToLowPrice()
    {
        await this.filter.click();
        await this.page.locator('.product_sort_container').selectOption({value: 'hilo'});
        const price = this.page.locator('#inventory_container > div > div:nth-child(1) > div.inventory_item_description > div.pricebar > div');
        await expect(price).toContainText('49.99');
    }

    async bikeLight()
    {
        await this.bikeLightImg.click();  

        const detailsSauceLabs = this.page.locator('.inventory_details_desc');
        await expect(detailsSauceLabs).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.")
    
        await expect(this.page.locator('.inventory_details_price')).toContainText('$9.99');    
    
        await expect(this.page.locator('#add-to-cart-sauce-labs-bike-light')).toContainText('Add' &&'cart');
    }

    async backToProducts()
    {
        await this.backFromProduct.click()
        await expect(this.page).toHaveURL(/.*inventory/);
    }

    async logOut()
    {
        await this.openMenu();
        await (this.page.locator('#logout_sidebar_link')).click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/')
    }
}