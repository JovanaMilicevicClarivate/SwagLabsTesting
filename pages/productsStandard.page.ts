import { expect, Locator, Page} from '@playwright/test';

export class ProductsStandard
{
    readonly page: Page;
    readonly cart: Locator;
    readonly filter: Locator;
    readonly listOfProducts: Locator
    
    constructor(page: Page) 
    {
        this.listOfProducts = page.locator(`.inventory_list`);
        this.cart = page.locator('#shopping_cart_container');
        this.filter = page.locator('.product_sort_container');
    }

//.inventory_list>.inventory_item:nth-child(${broj})>div>div:nth-child(2)>div
   //uf idk
    async priceOfTheItems()
    {
        let array = new Array();
        for(let broj=1; broj<7; broj++)
        {
            let priceOfAProduct = await this.listOfProducts.locator(`.inventory_item:nth-child(${broj})>div>div:nth-child(2)>div`);
            //array = await priceOfAProduct.textContent();
            
            //console.log(array);
        }
        console.log(array);
    }

    async openCart()
    {
        await this.cart.click();
    }


    async openFilter()
    {
        await this.filter.click();
    }
    async closeFilter()
    {
        await this.filter.click();
    }

    async addProduct(productName:string)
    {
        
        for(let broj=1;broj<7;broj++)
        {
            let cardOfAProduct = await this.listOfProducts.locator(`.inventory_item:nth-child(${broj})`);
            const btn = await cardOfAProduct.locator('div>div>button');

            if(await (btn.innerText()) == 'ADD TO CART')
            {
                if((await cardOfAProduct.innerText()).toString().includes(productName))
                {
                    await btn.click();
                    break;
                }
                else
                {
                    continue;
                }
            }
            else{ break;}
        }
    }

    async removeProduct(productName:string)
    { 
        for(let broj=1;broj<7;broj++)
        {
            let cardOfAProduct = await this.listOfProducts.locator(`.inventory_item:nth-child(${broj})`);
            const btn = await cardOfAProduct.locator('div>div>button');
            if(await btn.innerText() == 'REMOVE')
            {
                if((await cardOfAProduct.innerText()).toString().includes(productName))
                {
                    await btn.click();
                    break;
                }
                else
                {
                    continue;
                }
            }
            else{ break;}
        }
    }
}
    
