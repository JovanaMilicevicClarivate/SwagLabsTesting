import { expect, Locator, Page} from '@playwright/test';

export class cartStandard
{
    readonly page: Page;
    readonly continueShoppingBtn: Locator;
    readonly checkOutBtn: Locator;
    readonly removeJacket: Locator;
    readonly removeBackpack: Locator;
    readonly removeBikeLight: Locator;
    readonly removeBoltTshirt: Locator;
    readonly removeOnesie: Locator;
    readonly removeTshirt: Locator;

    constructor(page: Page) 
    {
        this.continueShoppingBtn = page.locator('#continue-shopping');
        this.checkOutBtn = page.locator('#checkout');
        this.removeJacket = page.locator('#remove-sauce-labs-fleece-jacket');
        this.removeBackpack = page.locator('#remove-sauce-labs-backpack');
        this.removeBikeLight= page.locator('#remove-sauce-labs-bike-light');
        this.removeBoltTshirt = page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.removeOnesie = page.locator('#remove-sauce-labs-onesie');
        this.removeTshirt = page.locator('id=remove-test.allthethings()-t-shirt-(red)');
    }

    async contunueShipping()
    {
        await this.continueShoppingBtn.click();
    }

    async checkOut()
    {
        await this.checkOutBtn.click();
    }

    async removeFleeceJacket()
    {
        await this.removeJacket.click();
    }

    async removeLabsBackpack()
    {
        await this.removeBackpack.click();
    }

    async removeLabsBikeLight()
    {
        await this.removeBikeLight.click();
    }

    async removeLabsBoltTshirt()
    {
        await this.removeBoltTshirt.click();
    }

    async removeLabsOnesie()
    {
        await this.removeOnesie.click();
    }
    
    async removeRedTshirt()
    {
        await this.removeTshirt.click();
    }

}