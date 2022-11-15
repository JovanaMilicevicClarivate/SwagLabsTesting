import { test, expect} from "@playwright/test";
import {loginPage} from '../pages/login.page';
import {productsStandard} from '../pages/productsStandard.page';

/*test.describe("navigation", () => {
    test.beforeEach(async ({page}) => {
        // Go to the starting url before each test.
        await page.goto("https://www.saucedemo.com/");
    });

    test("main navigation", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("https://www.saucedemo.com/");
      });
});*/

test('SwagLabs standard user using ModelObject',async ({page}) => {
    const login = new loginPage(page);
    const products = new productsStandard(page);

    //login the standard user
    await login.goto();
    await login.loginStandardUser();
    await expect(page).toHaveURL(/.*inventory/);

    //main page adding and removing products
    await products.addFleeceJacket();
    await products.addLabsBackpack();
    await products.addLabsBikeLight();
    await products.addLabsBoltTshirt();
    await products.addLabsOnesie();
    await products.addRedTshirt();

    const badgeNumber = page.locator('.shopping_cart_link >> .shopping_cart_badge');
    await expect(badgeNumber).toHaveText('6'); //treba 6
    await expect(products.addJacket).toBeHidden();

    


});
