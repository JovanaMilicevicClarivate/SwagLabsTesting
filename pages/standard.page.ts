import { expect, Locator, Page} from '@playwright/test';

export class StandardPage
{
    readonly page: Page;
    readonly badgeNumber: Locator;
    readonly menuButton: Locator;
    readonly closeMenuButton: Locator;
    readonly menu: Locator;
    readonly menuItems: Locator;
    
    constructor(page: Page) 
    {
        this.badgeNumber = page.locator('.shopping_cart_link >> .shopping_cart_badge');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
        this.menu = page.locator('.bm-menu-wrap');
        this.menuItems = page.locator('.bm-item-list');
    }

    async openMenu()
    {
        await this.menuButton.click();
    }
    async closeMenu()
    {
        await this.closeMenuButton.click();
    }
    async clickAnItemInMenu(menuItemName:string)
    {
        
        for(let broj=1; broj<5;broj++ )
        {
            const item = this.menuItems.locator(`.bm-item:nth-child(${broj})`);
            if((await item.innerText()).toString().includes(menuItemName))
            {
                await item.click();
                break;
            }
            else
            {
                continue;
            }
        }
        //kako da klikne na taj link
    }
}
