import { test, expect} from "@playwright/test";

test.describe("navigation", () => {
    test.beforeEach(async ({page}) => {
        // Go to the starting url before each test.
        await page.goto("https://www.saucedemo.com/");
    });

    test("main navigation", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("https://www.saucedemo.com/");
      });
});


test('SwagLabs login locked out user', async ({page}) => {
    const pageObject = new pageObjectModel(page);
    await pageObject.goto();
    await pageObject.logInLockedOut();

    const errorButton = page.locator('.error-button');
    await errorButton.click();

});


import { pageObjectModel} from '../pages/pageObjectModel-page';

test('SwagLabs standard user using ModelObject',async ({page}) => {
    const pageObject = new pageObjectModel(page);
    await pageObject.goto();
    await pageObject.logInStandard();

    await pageObject.addFleeceJacket();
    await expect(page.locator('#remove-sauce-labs-fleece-jacket')).toBeVisible();

    await pageObject.openCart();
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await pageObject.backFromCart();

    await pageObject.openMenu();
    await pageObject.closeMenu();

    await pageObject.filterHighToLowPrice();

    await pageObject.bikeLight();
    await pageObject.backToProducts();

    await pageObject.logOut();
});


test('SwagLabs login standard user', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    const inputUsername = page.getByPlaceholder('Username');
    const inputPassword = page.getByPlaceholder('Password');

    await inputUsername.fill('standard_user');
    await inputPassword.fill('secret_sauce');

    const loginButton = page.locator('#login-button');
    await loginButton.click();

    await expect(page).toHaveURL(/.*inventory/);

    const addSauceFleeceJacketToCart = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
    await addSauceFleeceJacketToCart.click();

    await expect(page.locator('#remove-sauce-labs-fleece-jacket')).toBeVisible();

    const shoppingCart = page.locator('.shopping_cart_link');
    await shoppingCart.click();

    await expect(page).toHaveURL(/.*cart/);

    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');

    await expect(page.locator('.cart_quantity')).toHaveText('1');

    const continueShopping = page.locator('#continue-shopping');
    await continueShopping.click();

    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    //dropdown ikonica na filter dugmetu ne radi. Ako se ne kline na nju onda radi 
    const dropdownFilter = page.locator('.product_sort_container');
    await dropdownFilter.click();

    //Kako da se proveri koliko options-a ima u select-u i u meniju koliko ima opcija
    //Kako da se proveri koja je slika postavljena

    //const optionIwant = page.getByText('Price (low to high)');    ???
    //await optionIwant.click();



    const pictureOfProducts = page.locator('.inventory_item_img');
    //await expect((await pictureOfProducts.count()).toString()).toEqual(6);

    const sauceLabs = page.locator('#item_0_img_link');
    await sauceLabs.click();
    //await expect(page).toHaveURL(/.*inventory-item.html?id=0/);

    const detailsSauceLabs = page.locator('.inventory_details_desc');
    await expect(detailsSauceLabs).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.")

    await expect(page.locator('.inventory_details_price')).toContainText('$9.99');    

    await expect(page.locator('#add-to-cart-sauce-labs-bike-light')).toContainText('Add' &&'cart');

    //const backButton = await page.getByRole('button', {name: 'back-to-products'});
    const backButton = page.locator('#back-to-products');
    await backButton.click();

    const menuButton = page.locator('#react-burger-menu-btn');
    const menu = page.locator('.bm-menu-wrap');
    await expect(menu).toBeHidden();
    await menuButton.click();
    await expect(menu).toBeVisible();

    await (page.locator('#add-to-cart-sauce-labs-bolt-t-shirt')).click();
    await expect(page.locator('#remove-sauce-labs-bolt-t-shirt')).toBeVisible();
    await expect(menu).toBeVisible();

    await (page.locator('#reset_sidebar_link')).click();
    await expect(page.locator('.shopping_cart_badge')).toBeHidden();

    await (page.locator('#logout_sidebar_link')).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/')

});

test('SwagLabs login problem user', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    const inputUsername = page.getByPlaceholder('Username');
    const inputPassword = page.getByPlaceholder('Password');

    await inputUsername.fill('problem_user');
    await inputPassword.fill('secret_sauce');

    const loginButton = page.locator('#login-button');
    await loginButton.click();

    await expect(page).toHaveURL(/.*inventory/);
});

test('SwagLabs login performance glitch user', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    const inputUsername = page.getByPlaceholder('Username');
    const inputPassword = page.getByPlaceholder('Password');

    await inputUsername.fill('performance_glitch_user');
    await inputPassword.fill('secret_sauce');

    const loginButton = page.locator('#login-button');
    await loginButton.click();

    await expect(page).toHaveURL(/.*inventory/);
});