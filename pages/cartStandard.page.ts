import { expect, Locator, Page} from '@playwright/test';

export class CartStandard
{
    readonly page: Page;
    readonly backtoShoppingBtn: Locator;
    readonly checkOutBtn: Locator;
    readonly price: Locator;
    readonly itemInCart: Locator;
    readonly allItems: Locator;
    constructor(page: Page) 
    {
        this.backtoShoppingBtn = page.locator('#continue-shopping');
        this.checkOutBtn = page.locator('#checkout');
        this.itemInCart = page.locator('.cart_list');
        this.allItems = this.itemInCart.locator('.cart_item');
    }

    async removeItemFromTheCart(itemName)
    {
        for (let broj=3; broj<await this.allItems.count(); broj++)
        {
            const itemIamLookingFor = this.itemInCart.locator(`.cart_item:nth-child(${broj})`);
            const btn = itemIamLookingFor.locator('div>div:nth-child(3)>button');
            if((await itemIamLookingFor.innerText()).toString().includes(itemName))
            {
                await btn.click();
                break;
            }
            else
            {
                continue;
            }
        }
    }

    async backtoShopping()
    {
        await this.backtoShoppingBtn.click();
    }

    async checkOut()
    {
        await this.checkOutBtn.click();
    }

}