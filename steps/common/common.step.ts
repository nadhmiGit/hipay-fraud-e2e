import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { Given, Then, When } from '../authentication/fixtures';

/**
 * Common Step Definitions
 * 
 * Reusable steps that can be used across multiple features
 */

Given('I am logged in as {string}', async ({ page }, email: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, process.env.TEST_PASSWORD || 'SecurePassword123');
  await page.waitForURL(/.*dashboard/);
});

Given('I am on the home page', async ({ page }) => {
  await page.goto('/');
});

When('I enter {string} in the search box', async ({ page }, query: string) => {
  const searchBox = page.getByPlaceholder('Search...');
  await searchBox.fill(query);
});

When('I click the search button', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: /search/i });
  await searchButton.click();
});

When('I click the search button without entering text', async ({ page }) => {
  const searchButton = page.getByRole('button', { name: /search/i });
  await searchButton.click();
});

Then('I should see search results', async ({ page }) => {
  const results = page.getByTestId('search-results');
  await expect(results).toBeVisible();
});

Then('the results should contain {string}', async ({ page }, text: string) => {
  const results = page.getByTestId('search-results');
  await expect(results).toContainText(text);
});

Then('I should see a message {string}', async ({ page }, message: string) => {
  const messageElement = page.getByText(message);
  await expect(messageElement).toBeVisible();
});

Then('I should see a validation message {string}', async ({ page }, message: string) => {
  const validationMessage = page.getByTestId('validation-message');
  await expect(validationMessage).toContainText(message);
});

Then('I should see search results for {string}', async ({ page }, query: string) => {
  const results = page.getByTestId('search-results');
  await expect(results).toBeVisible();
  // Optional: verify results are relevant to the query
  await expect(results).toContainText(new RegExp(query, 'i'));
});
