import {test,expect} from '@playwright/test';

test.describe("Login test", ()=> {

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test("Check the login functionality", async ({page}) => {
        // await page.goto('https://www.saucedemo.com/');

        await expect(page).toHaveTitle('Swag Labs');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByText('Login').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.inventory_item')).toHaveCount(6);

        await page.getByText('Sauce Labs Backpack').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
        
    });

    test('invalid login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');

        await page.getByPlaceholder('Username').fill('standard_use');
        await page.getByPlaceholder('Password').fill('secret_sauce');

        // await page.getByText('Login').click();        

        await page.locator('[name="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
});


    




