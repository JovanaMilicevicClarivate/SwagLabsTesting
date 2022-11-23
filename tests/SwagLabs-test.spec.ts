import { test, expect} from "@playwright/test";
import {loginPage} from '../pages/login.page';
import {productsStandard} from '../pages/productsStandard.page';
import {cartStandard} from '../pages/cartStandard.page';
import {checkoutPage} from '../pages/checkout.page';
import {checkoutOverview} from '../pages/checkoutOverview.page';
import {checkoutComplete} from '../pages/checkoutComplete.page';

test('SwagLabs standard user using ModelObject',async ({page}) => {
     // TODO add suffix to each page, eg. loginPage etc.
    const login = new loginPage(page);
    const products = new productsStandard(page);
    const cart = new cartStandard(page);
    const checkout = new checkoutPage(page);
    const overview = new checkoutOverview(page);
    const completes = new checkoutComplete(page);

    //login the standard user
    await login.goto();
     // TODO make this method take username and password argument
    await login.loginStandardUser();
    await expect(page).toHaveURL(/.*inventory/);

    //main page adding and removing products
    // TODO can we make more generic methods for adding such as addProduct?
    await products.addFleeceJacket();
    await products.addLabsBoltTshirt();
    await products.addRedTshirt();
    // TODO can this be moved to page object?
    const badgeNumber = page.locator('.shopping_cart_link >> .shopping_cart_badge');
    // why ?
    await expect(products.addJacket).toBeHidden();
    await expect(badgeNumber).toHaveText('3'); 
    

    //main page - using fiters
    await products.openFilter();
    await products.filter.selectOption({value: 'hilo'});
    // TODO can this be moved to page object?
    const price = page.locator('#inventory_container > div > div:nth-child(1) > div.inventory_item_description > div.pricebar > div');
    // TODO try to take all price values and sort them, and then assert
    await expect(price).toContainText('49.99');
    // TODO can we make more generic methods for adding such as removeProduct?
    await products.removeRedTshirt();
    await expect(products.addTshirt).toBeVisible();
    await expect(badgeNumber).toHaveText('2');
    await products.addLabsBackpack();
    // TODO try to take all item name values and sort them a to z/z to a, and then assert
    await expect(products.addBackpack).toBeHidden();
    await expect(badgeNumber).toHaveText('3');

    await products.openFilter();
    await products.filter.selectOption({value: 'za'});
    //??da li moze da se proverava po prvom slovu elementa
    // TODO can this be moved to page object?
    const inventoryRedShirt = page.locator('.inventory_item:nth-child(1)>div>div:nth-child(1)>a');
    // TODO dont confuse yourself :D
    await expect(inventoryRedShirt).toHaveText('Test.allTheThings() T-Shirt (Red)');

    //main page - go to the cart page
    await products.openCart();
    await expect(page).toHaveURL(/.*cart/);
    
    //cart page
    await expect((await page.locator('.cart_item').count()).toString()).toEqual('3');
    await cart.removeFleeceJacket();
    await expect((await page.locator('.cart_item').count()).toString()).toEqual('2');

    //await expect(page.locator('#cart_contents_container>div>div.cart_list>div:nth-child(3)>div.cart_quantity')).toHaveText('1');
    //ne radi ne znam zasto

    //continu shopping - from cart page back to main page
    // TODO maybe rename method to reflect state - or the action that happens?
    await cart.contunueShipping();
    await expect(page).toHaveURL(/.*inventory/);

    //main page to cart page to checkout
    await products.openCart();
    await expect(page).toHaveURL(/.*cart/);
    await cart.checkOut();
    await expect(page).toHaveURL(/.*checkout-step-one/);

    //checkout page
    
    await checkout.continueCheckout();
    await expect(checkout.error).toHaveText('Error: First Name is required');
    await expect(checkout.errorMessage).toBeVisible();
    await checkout.inputFirstName();
    await checkout.continueCheckout();
    await expect(checkout.error).toHaveText('Error: Last Name is required');
    await expect(checkout.errorMessage).toBeVisible();
    await checkout.inputLastName();
    await checkout.continueCheckout();
    await expect(checkout.error).toHaveText('Error: Postal Code is required');
    await expect(checkout.errorMessage).toBeVisible();
    // TODO can we describe code more?
    await checkout.inputCode();
    await checkout.continueCheckout();
    //-----

    //checkout OVERVIEW
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect((await page.locator('.cart_item').count()).toString()).toEqual('2');

    await expect(overview.shippingInfo).toHaveText('FREE PONY EXPRESS DELIVERY!');
    await expect(overview.itemTotal).toContainText('45.98');
    await expect(overview.tax).toContainText('3.68');
    // TODO try making a function that sums 2 previous values
    await expect(overview.total).toContainText('49.66');
    await overview.finishCheckout();

    // TODO assert text - thank you for your order and whatever it is
    await expect(completes.image).toBeVisible();
    await completes.backToMain();
    await expect(page).toHaveURL(/.*inventory/);

    //main page - reseting app state from menu
    await products.openMenu();
    await expect((await page.locator('.bm-item.menu-item').count()).toString()).toEqual('4');
    await page.locator('.bm-item.menu-item:nth-child(4)').click();
    await expect(badgeNumber).toBeHidden();
    //cart after resetting the app state
    await products.openCart();
    await expect(page).toHaveURL(/.*cart/);
    await expect((await page.locator('.cart_item').count()).toString()).toEqual('0');
    await cart.contunueShipping();

    //main page - log out
    await products.openMenu();
    await page.locator('.bm-item.menu-item:nth-child(3)').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});
