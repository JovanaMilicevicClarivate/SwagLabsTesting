import { expect, Locator, Page} from '@playwright/test';

export class CheckoutOverview
{
    readonly page: Page;
    readonly listOfBoughtItems: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly shippingInfo: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly pokusaj: Locator;

    constructor(page: Page) 
    {
        this.cancelButton = page.locator('#cancel');
        this.finishButton = page.locator('#finish');
        this.shippingInfo = page.locator('.summary_info>.summary_value_label:nth-child(4)');
        this.itemTotal = page.locator('.summary_info>.summary_subtotal_label');
        this.tax = page.locator('.summary_info>.summary_tax_label');
        this.total = page.locator('.summary_info>.summary_total_label');
        this.pokusaj =  page.locator('.summary_info>.summary_subtotal_label');
        this.listOfBoughtItems = page.locator('.cart_item');
    }

    async cancelCheckout()
    {
        this.cancelButton.click();
    }
    async finishCheckout()
    {
        this.finishButton.click();
    }
    /*async sum()
    {
        //const  promenljiva = await this.pokusaj.textContent()
        //console.log(promenljiva);

        //nop..
        //zelela sam da napravim metodu koja ce da sumira sumu stvari i tax-a al ne mogu nikako da izvucem podatke koji mi trebaju
    }*/

}