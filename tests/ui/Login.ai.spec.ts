import {test,expect} from '@playwright/test';
import {ai} from '@zerostep/playwright';

async function doAI(task: string,{page,test}: {page:any,test:any}){
    return ai(task,{page,test});
}

test.describe("Login test with AI", ()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('valid login navigates to inventory',async({page}) => {
        await expect(page).toHaveTitle('Swag Labs');

        await doAI('Type "standard_user" into the username field',{page,test});
        await doAI('Type "secret_sauce" into the password field',{page,test});
        await doAI('Click the login button',{page,test});

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    });

    test('Purchase a Product',async({page}) =>{
        await doAI('Type "standard_user" into the username field',{page,test});
        await doAI('Type "secret_sauce" into the password field',{page,test});
        await doAI('Click the login button',{page,test});

        await doAI('Click the "Add to Cart" button of "Sauce Labs Backpack" product',{page,test});

        await page.locator('[class="shopping_cart_link"]').click();

        await page.locator('[id="checkout"]').click();

        await expect(page.locator('[class="title"]')).toHaveText("Checkout: Your Information");

        await page.getByPlaceholder('First Name').fill('John');
        await doAI('Fill "Last Name" as "Zoe"',{page,test});
        await page.locator('[id="postal-code"]').fill('12345');
    });
});