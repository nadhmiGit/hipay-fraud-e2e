import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/** * Login Page Object for WebDriverUniversity
 *
 * Represents the login page on WebDriverUniversity and encapsulates all login-related interactions
 *
 * */
export class LoginWebUnivPage extends BasePage {
  // Locators
  readonly emailWebUnivInput: Locator;
  readonly passwordWebUnivInput: Locator;
  readonly loginWebUnivButton: Locator;

  constructor(page: Page) {
    // super(page, '/Login-Portal/');
    super(page, '');

    // Initialize locators
    this.emailWebUnivInput = page.getByPlaceholder('Username');
    this.passwordWebUnivInput = page.getByPlaceholder('Password');
    this.loginWebUnivButton = page.locator('#login-button');
    // this.loginWebUnivButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Perform login with credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailWebUnivInput.fill(email);
    await this.passwordWebUnivInput.fill(password);
    await this.clickLoginWebUnivButton();
    // Wait for navigation or error
    // await this.page.waitForURL(/.*Login-Portal/);
  }

  /**
   * Click the login button
   */
  async clickLoginWebUnivButton() {
    const dialogPromise = this.page.waitForEvent('dialog');

    await this.page.evaluate(() => {
      // @ts-ignore
      validate();
    });

    return await dialogPromise;
  }
}
