import { expect, Locator, Page} from '@playwright/test';

export class checkoutComplete
{
    readonly page: Page;
    readonly backButton: Locator;
    readonly image: Locator;

    constructor(page: Page) 
    {
        this.backButton = page.locator('#back-to-products');
        this.image = page.locator('.pony_express');
    }

    async backToMain()
    {
        await this.backButton.click();
    }
}