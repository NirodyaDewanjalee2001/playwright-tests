import { test as base, expect, Page } from '@playwright/test';

// Extend the base test with a custom fixture
const test = base.extend<{
  loggedInPage: Page;
}>({
  loggedInPage: async ({ page }: {page: Page}, use: (page: Page) => Promise<void>) => {
    // Go to login page
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Verify login worked
    await expect(page).toHaveURL(/inventory/);

    // Provide the logged-in page to tests
    await use(page);
  },
});

export { test, expect };
