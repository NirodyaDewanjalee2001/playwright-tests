import { test, expect } from '../../fixtures/custom-fixtures';

test.describe('Dashboard', () => {
  test('should show products after login', async ({ loggedInPage }) => {
    // loggedInPage is already logged in!
    await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6);
  });
});
