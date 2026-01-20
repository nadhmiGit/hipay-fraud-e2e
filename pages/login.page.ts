import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Login Page Object
 * 
 * Represents the login page and encapsulates all login-related interactions
 */
export class LoginPage extends BasePage {
  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly emailValidationError: Locator;
  readonly passwordValidationError: Locator;
  readonly loginForm: Locator;
  readonly resetPasswordForm: Locator;
  readonly successMessage: Locator;
  readonly resetEmailInput: Locator;
  readonly sendResetButton: Locator;

  constructor(page: Page) {
    super(page, '/login');
    
    // Initialize locators
    this.loginForm = page.getByTestId('login-form');
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.loginButton = page.getByRole('button', { name: /Sign in|Login/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /Forgot password/i });
    this.errorMessage = page.getByTestId('error-message');
    this.emailValidationError = page.getByTestId('email-error');
    this.passwordValidationError = page.getByTestId('password-error');
    this.resetPasswordForm = page.getByTestId('reset-password-form');
    this.successMessage = page.getByTestId('success-message');
    this.resetEmailInput = page.getByLabel('Email', { exact: true });
    this.sendResetButton = page.getByRole('button', { name: /Send reset link/i });
  }

  /**
   * Perform login with credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.clickLoginButton();
    
    // Wait for navigation or error
    await this.page.waitForURL(/.*dashboard|.*login/);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await this.resetEmailInput.fill(email);
    await this.sendResetButton.click();
  }

  /**
   * Check if logged in by verifying URL
   */
  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('/dashboard');
  }

  /**
   * Get error message text
   */
  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
