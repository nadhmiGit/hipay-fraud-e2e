// import { expect } from '@playwright/test';
// import { LoginPage } from '../../pages/login.page';
// import { Given, Then, When } from './fixtures';

// /**
//  * Login Step Definitions
//  *
//  * These step definitions handle all login-related scenarios
//  */

// let loginPage: LoginPage;

// Given('I am on the login page', async ({ page }) => {
//   loginPage = new LoginPage(page);
//   await loginPage.goto();
// });

// When('I enter email {string}', async ({ page }, email: string) => {
//   await loginPage.emailInput.fill(email);
// });

// When('I enter password {string}', async ({ page }, password: string) => {
//   await loginPage.passwordInput.fill(password);
// });

// When('I click the login button', async ({ page }) => {
//   await loginPage.clickLoginButton();
// });

// Then('I should be redirected to the dashboard', async ({ page }) => {
//   await page.waitForURL(/.*dashboard/);
//   await expect(page).toHaveURL(/.*dashboard/);
// });

// Then('I should see a welcome message', async ({ page }) => {
//   const welcomeMessage = page.getByTestId('welcome-message');
//   await expect(welcomeMessage).toBeVisible();
// });

// Then('I should see an error message {string}', async ({ page }, message: string) => {
//   await expect(loginPage.errorMessage).toBeVisible();
//   await expect(loginPage.errorMessage).toContainText(message);
// });

// Then('I should see an error message', async ({ page }) => {
//   await expect(loginPage.errorMessage).toBeVisible();
// });

// Then('I should remain on the login page', async ({ page }) => {
//   await expect(page).toHaveURL(/.*login/);
//   await expect(loginPage.loginForm).toBeVisible();
// });

// Then('I should see a validation error for email field', async ({ page }) => {
//   await expect(loginPage.emailValidationError).toBeVisible();
// });

// Then('I should see a validation error for password field', async ({ page }) => {
//   await expect(loginPage.passwordValidationError).toBeVisible();
// });
