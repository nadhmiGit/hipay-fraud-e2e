import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';
import { Then, When } from './fixtures';

/**
 * Logout Step Definitions
 * 
 * These step definitions handle logout scenarios
 */

let dashboardPage: DashboardPage;

When('I am on the dashboard page', async ({ page }) => {
  dashboardPage = new DashboardPage(page);
  await dashboardPage.goto();
});

When('I am on the profile page', async ({ page }) => {
  await page.goto('/profile');
});

When('I click on the user menu', async ({ page }) => {
  await dashboardPage.openUserMenu();
});

When('I click the logout button', async ({ page }) => {
  await dashboardPage.logoutButton.click();
});

Then('I should be redirected to the login page', async ({ page }) => {
  await page.waitForURL(/.*login/);
  await expect(page).toHaveURL(/.*login/);
});

Then('I should not be able to access the dashboard without logging in again', async ({ page }) => {
  // Try to navigate to dashboard
  await page.goto('/dashboard');
  
  // Should be redirected back to login
  await expect(page).toHaveURL(/.*login/);
});
