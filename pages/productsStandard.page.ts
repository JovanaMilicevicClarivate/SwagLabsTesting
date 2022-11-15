import { expect, Locator, Page} from '@playwright/test';

export class productsStandard
{
    readonly page: Page;
    readonly addJacket: Locator;
    readonly addBackpack: Locator;
    readonly addBikeLight: Locator;
    readonly addBoltTshirt: Locator;
    readonly addOnesie: Locator;
    readonly addTshirt: Locator;
    readonly removeJacket: Locator;
    readonly removeBackpack: Locator;
    readonly removeBikeLight: Locator;
    readonly removeBoltTshirt: Locator;
    readonly removeOnesie: Locator;
    readonly removeTshirt: Locator;
    readonly cart: Locator;
    readonly menuButton: Locator;
    readonly menu: Locator;
    readonly filter: Locator;

    constructor(page: Page) 
    {
        this.addJacket = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
        this.addBackpack = page.locator('#add-to-cart-sauce-labs-backpack');
        this.addBikeLight = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.addBoltTshirt = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.addOnesie = page.locator('#add-to-cart-sauce-labs-onesie');
            this.addTshirt = page.locator('id=add-to-cart-test.allthethings()-t-shirt-(red)');
        this.removeJacket = page.locator('#remove-sauce-labs-fleece-jacket');
        this.removeBackpack = page.locator('#remove-sauce-labs-backpack');
        this.removeBikeLight= page.locator('#remove-sauce-labs-bike-light');
        this.removeBoltTshirt = page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.removeOnesie = page.locator('#remove-sauce-labs-onesie');
        this.removeTshirt = page.locator('#remove-test.allthethings()-t-shirt-(red)');
        this.cart = page.locator('#shopping_cart_container');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.menu = page.locator('.bm-menu-wrap');
        this.filter = page.locator('.product_sort_container');
    }

    async addFleeceJacket()
    {
        await this.addJacket.click();
    }
    async removeFleeceJacket()
    {
        await this.removeJacket.click();
    }

    async addLabsBackpack()
    {
        await this.addBackpack.click();
    }
    async removeLabsBackpack()
    {
        await this.removeBackpack.click();
    }

    async addLabsBikeLight()
    {
        await this.addBikeLight.click();
    }
    async removeLabsBikeLight()
    {
        await this.removeBikeLight.click();
    }

    async addLabsBoltTshirt()
    {
        await this.addBoltTshirt.click();
    }
    async removeLabsBoltTshirt()
    {
        await this.removeBoltTshirt.click();
    }

    async addLabsOnesie()
    {
        await this.addOnesie.click();
    }
    async removeLabsOnesie()
    {
        await this.removeOnesie.click();
    }

    async addRedTshirt()
    {
        await this.addTshirt.click();
    }
    async removeRedTshirt()
    {
        await this.removeTshirt.click();
    }
}