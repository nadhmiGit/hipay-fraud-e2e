import { expect, Dialog } from '@playwright/test';
import { LoginWebUnivPage } from '../../pages/loginWebUniv.page';
import { Given, When, Then } from './fixtures';

let loginWebUnivPage: LoginWebUnivPage;
let dialogTextPromise: Promise<string>;

Given('I navigate to the webdriveruniversity login page', async ({ page }) => {
  loginWebUnivPage = new LoginWebUnivPage(page);
  await loginWebUnivPage.goto();
});

When('I enter email of webUniv {string}', async ({}, email: string) => {
  await loginWebUnivPage.emailWebUnivInput.fill(email);
});

When('I enter password of webUniv {string}', async ({}, password: string) => {
  await loginWebUnivPage.passwordWebUnivInput.fill(password);
});

When('I click the login button of webUniv', async ({ page }) => {
  dialogTextPromise = new Promise<string>((resolve) => {
    page.once('dialog', async (d) => {
      const msg = d.message();
      await d.accept();
      resolve(msg);
    });
  });

  // déclenche la validation (1 seule méthode)
  await page.evaluate(() => {
    // @ts-ignore
    validate();
  });
});

Then(
  'I should be presented with an alert box which contains text {string}',
  async ({}, expectedAlertText: string) => {
    const msg = await dialogTextPromise;
    expect(msg).toContain(expectedAlertText);
  }
);


// When('I click the login button of webUniv', async ({ page }) => {
//   await loginWebUnivPage.clickLoginWebUnivButton();
// });
