
import {test, expect} from '@playwright/test';

test.describe("navigation", () => {
    test.beforeEach(async ({page}) => {
        // Go to the starting url before each test.
        await page.goto("https://playwright.dev/");
    });

    test("main navigation", async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL("https://playwright.dev/");
      });
});

test('homepage has Playwright in title and get started link linking to the intro page', async({page})=>{
    await page.goto('https://playwright.dev/');
 
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);

    // create a locator
    const getStarted = page.getByRole('link', {name: 'Get started'});

    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');
    
    // Click the get started link.
    await getStarted.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});