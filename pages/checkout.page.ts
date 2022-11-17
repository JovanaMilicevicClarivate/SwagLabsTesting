import { expect, Locator, Page} from '@playwright/test';

export class checkoutPage
{
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputSurname: Locator;
    readonly inputZipCode: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly errorOnInput: Locator;
    readonly errorIcon: Locator;
    readonly error: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) 
    {
        this.inputName = page.locator('#first-name');
        this.inputSurname = page.locator('#last-name');
        this.inputZipCode = page.locator('#postal-code');
        this.cancelButton = page.locator('#cancel');
        this.continueButton = page.locator('#continue');
        this.errorOnInput = page.locator('.input_error .form_input .error')
        this.errorIcon = page.locator('.svg-inline--fa .fa-times-circle .fa-w-16 .error_icon')
        this.error = page.locator('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3');
        this.errorMessage = page.locator('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3');
      
    }

    async inputFirstName()
    {
        await this.inputName.fill('Test');
    }
    async inputLastName()
    {
        await this.inputSurname.fill('Agent');
    }
    async inputCode()
    {
        await this.inputZipCode.fill('12000');
    }
    async errorBlock()
    {
        /*if(this.inputName == null || this.inputSurname == null || this.inputZipCode == null)
        {
            return this.error;
        }*/
        /*
        switch(this.error)
        {
            case this.inputName:
                if (this.inputName == null)
                {
                    return this.errorMessage.innerText(); //textContent()
                }
            case this.inputSurname:
        }*/

    }
    async cancelCheckout()
    {
        await this.cancelButton.click();
    }

    async continueCheckout()
    {
        await this.continueButton.click();
    }
}