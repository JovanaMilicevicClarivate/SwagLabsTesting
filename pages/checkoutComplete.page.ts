import { expect, Locator, Page} from '@playwright/test';

export class CheckoutComplete
{
    readonly page: Page;
    readonly backButton: Locator;

    constructor(page: Page) 
    {
        this.backButton = page.locator('#back-to-products');
    }

    async backToMain()
    {
        await this.backButton.click();
    }
}