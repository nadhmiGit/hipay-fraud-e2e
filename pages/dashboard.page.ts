import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Dashboard Page Object
 * 
 * Represents the main dashboard page after login
 */
export class DashboardPage extends BasePage {
  // Locators
  readonly welcomeMessage: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly profileLink: Locator;
  readonly settingsLink: Locator;
  readonly notificationBadge: Locator;
  readonly sidebarMenu: Locator;

  constructor(page: Page) {
    super(page, '/dashboard');
    
    // Initialize locators
    this.welcomeMessage = page.getByTestId('welcome-message');
    this.userMenu = page.getByTestId('user-menu');
    this.logoutButton = page.getByRole('button', { name: /Logout|Sign out/i });
    this.profileLink = page.getByRole('link', { name: /Profile/i });
    this.settingsLink = page.getByRole('link', { name: /Settings/i });
    this.notificationBadge = page.getByTestId('notification-badge');
    this.sidebarMenu = page.getByTestId('sidebar-menu');
  }

  /**
   * Open user menu
   */
  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.logoutButton.click();
    
    // Wait for redirect to login page
    await this.page.waitForURL(/.*login/);
  }

  /**
   * Navigate to profile page
   */
  async goToProfile(): Promise<void> {
    await this.openUserMenu();
    await this.profileLink.click();
  }

  /**
   * Navigate to settings page
   */
  async goToSettings(): Promise<void> {
    await this.openUserMenu();
    await this.settingsLink.click();
  }

  /**
   * Get notification count
   */
  async getNotificationCount(): Promise<number> {
    const text = await this.notificationBadge.textContent();
    return parseInt(text || '0', 10);
  }

  /**
   * Navigate using sidebar menu
   */
  async navigateTo(menuItem: string): Promise<void> {
    await this.sidebarMenu.getByRole('link', { name: new RegExp(menuItem, 'i') }).click();
  }

  /**
   * Wait for dashboard to load
   */
  async waitForDashboardLoad(): Promise<void> {
    await this.welcomeMessage.waitFor({ state: 'visible' });
    await this.waitForPageLoad();
  }
}
