import {test, expect} from '@playwright/test';


test('User can login to Rakuten', async ({ page }) => {
    await page.goto('https://www.rakuten.com/');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePassword123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByTestId('welcome-message')).toBeVisible();
})

