import { expect } from '@playwright/test';
import { LoginWebUnivPage } from '../../pages/loginWebUniv.page';
import { Given, Then, When } from './fixtures';


let loginWebUnivPage: LoginWebUnivPage;


Given('I navigate to the webdriveruniversity login page', async ({ page }) => {
  loginWebUnivPage = new LoginWebUnivPage(page);
  await loginWebUnivPage.goto();
});

When('I enter email of webUniv {string}', async ({ page }, email: string) => {
  await loginWebUnivPage.emailWebUnivInput.fill(email);
});

When('I enter password of webUniv {string}', async ({ page }, password: string) => {
  await loginWebUnivPage.passwordWebUnivInput.fill(password);
});

When('I click the login button of webUniv', async ({ page }) => {
  await loginWebUnivPage.clickLoginWebUnivButton();
});

// Then('I should see a welcome message', async ({ page }) => {
//   const welcomeMessage = page.getByTestId('welcome-message');
//   await expect(welcomeMessage).toBeVisible();
// });

// Then('I should see an error message {string}', async ({ page }, message: string) => {
//   await expect(loginWebUnivPage.errorMessage).toBeVisible();
//   await expect(loginWebUnivPage.errorMessage).toContainText(message);
// });