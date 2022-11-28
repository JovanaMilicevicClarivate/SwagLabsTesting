import { test, expect} from "@playwright/test";
import { LoginPage} from '../pages/login.page';
import { ProductsStandard} from '../pages/productsStandard.page';
import { CartStandard} from '../pages/cartStandard.page';
import { CheckoutPage} from '../pages/checkout.page';
import { CheckoutOverview} from '../pages/checkoutOverview.page';
import { CheckoutComplete} from '../pages/checkoutComplete.page';
import { StandardPage } from "../pages/standard.page";

test('SwagLabs standard user using ModelObject',async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsStandard(page);
    const cartPage = new CartStandard(page);
    const checkoutPage = new CheckoutPage(page);
    const overviewPage = new CheckoutOverview(page);
    const completionPage = new CheckoutComplete(page);
    const standardPage = new StandardPage(page);
    
    //login the standard user
    await loginPage.goToLoginPage();
    await loginPage.loginUsers('standard_user','secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);

    //reset app state
    await standardPage.openMenu();
    await standardPage.clickAnItemInMenu('RESET APP STATE');
    await expect(standardPage.badgeNumber).toBeHidden();
    await standardPage.closeMenu();

    //await productsPage.priceOfTheItems();


    //main page adding and removing products
    await productsPage.addProduct('Sauce Labs Fleece Jacket');
    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.removeProduct('Sauce Labs Backpack');
   
    await expect(standardPage.badgeNumber).toHaveText('1'); 
    

    //main page - using fiters
    await productsPage.openFilter();
    await productsPage.filter.selectOption({value: 'hilo'});
    //treba da napravim funkciju koja proverava price unutar liste odakle se proverava da li je prvi item lowest ili highest price ako se bila hilo ili lohi
    //await expect(price).toContainText('49.99');
    //dodati proveru za cene

    /*await productsPage.addProduct('Sauce Labs Bike Light');
    await expect(standardPage.badgeNumber).toHaveText('2');
    await productsPage.addProduct('Sauce Labs Onesie'); //dodavanje Onesia i Crvene majce ne radi, teorija da nije vidljiva pa ne moze da klikne. 
    //kako da se skroluje ako ne moze da se koristi ScrollIntoViewIfNeeded() posto ona vraca void a ne mogu to da koristim za ovo sto sam ispisala....
    await expect(standardPage.badgeNumber).toHaveText('3');*/

    await productsPage.openFilter();
    await productsPage.filter.selectOption({value: 'za'});

    await productsPage.addProduct('Sauce Labs Backpack'); //nesto ne radi
    await productsPage.addProduct('Sauce Labs Bolt T-Shirt');

    //main page - go to the cart page
    await productsPage.openCart();
    await expect(page).toHaveURL(/.*cart/);
    
    //cart page
    await expect((await cartPage.allItems.count()).toString()).toEqual('3');
   
    await expect((await cartPage.allItems.count()).toString()).toEqual('2');

    //await expect(page.locator('#cart_contents_container>div>div.cart_list>div:nth-child(3)>div.cart_quantity')).toHaveText('1');
    //ne radi ne znam zasto

    //continu shopping - from cart page back to main page
    await cartPage.backtoShopping();
    await expect(page).toHaveURL(/.*inventory/);

    //main page to cart page to checkout
    await productsPage.openCart();
    await expect(page).toHaveURL(/.*cart/);
    await cartPage.checkOut();
    await expect(page).toHaveURL(/.*checkout-step-one/);

    //checkout page
    
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.error).toHaveText('Error: First Name is required');
    await expect(checkoutPage.errorMessage).toBeVisible();
    await checkoutPage.inputFirstName();
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.error).toHaveText('Error: Last Name is required');
    await expect(checkoutPage.errorMessage).toBeVisible();
    await checkoutPage.inputLastName();
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.error).toHaveText('Error: Postal Code is required');
    await expect(checkoutPage.errorMessage).toBeVisible();
    await checkoutPage.inputPostalCode();
    await checkoutPage.continueCheckout();
    //-----

    //checkout OVERVIEW
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect((overviewPage.listOfBoughtItems.count()).toString()).toEqual('2');
    await expect(overviewPage.shippingInfo).toHaveText('FREE PONY EXPRESS DELIVERY!');
    await expect(overviewPage.itemTotal).toContainText('45.98');
    await expect(overviewPage.tax).toContainText('3.68');
    await expect(overviewPage.total).toContainText('49.66');
    await overviewPage.finishCheckout();


    await completionPage.backToMain();
    await expect(page).toHaveURL(/.*inventory/);

    //main page - reseting app state from menu
    await standardPage.openMenu();
    await standardPage.clickAnItemInMenu('RESET APP STATE');
    await expect(standardPage.badgeNumber).toBeHidden();
    //cart after resetting the app state
    await productsPage.openCart();
    await expect(page).toHaveURL(/.*cart/);
    await expect((cartPage.itemInCart.count()).toString()).toEqual('0');
    await cartPage.backtoShopping();

    //main page - log out
    await standardPage.openMenu();
    await standardPage.clickAnItemInMenu('LOGOUT');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});
