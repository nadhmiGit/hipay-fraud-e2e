import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

/**
 * Custom test fixtures
 *
 * This file defines custom fixtures that can be used across all tests
 * Fixtures provide a way to set up test prerequisites and clean up after tests
 */

// Define custom fixture types
type CustomFixtures = {
  authenticatedPage: Page;
  testUser: TestUser;
  apiClient: APIClient;
};

// Test user type
export type TestUser = {
  email: string;
  password: string;
  name: string;
  id?: string;
};

// API Client type
export type APIClient = {
  get: (url: string) => Promise<any>;
  post: (url: string, options?: any) => Promise<any>;
  put: (url: string, options?: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
};

// Extend base test with custom fixtures
export const test = base.extend<CustomFixtures>({
  /**
   * Authenticated page fixture
   * Automatically logs in before each test that uses it
   */
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Perform login with test credentials
    await loginPage.login(
      process.env.TEST_USERNAME || 'test.user@example.com',
      process.env.TEST_PASSWORD || 'SecurePassword123',
    );

    // Wait for successful login
    await page.waitForURL(/.*dashboard/);

    // Provide the authenticated page to the test
    await use(page);

    // Cleanup: logout after test (optional)
    // await page.getByRole('button', { name: /Logout/i }).click();
  },

  /**
   * Test user fixture
   * Provides test user data
   */
  testUser: async ({}, use) => {
    const user: TestUser = {
      email: process.env.TEST_USERNAME || 'test.user@example.com',
      password: process.env.TEST_PASSWORD || 'SecurePassword123',
      name: 'Test User',
      id: 'test-user-123',
    };

    await use(user);
  },

  /**
   * API Client fixture
   * Provides an authenticated API client for making requests
   */
  apiClient: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';

    const client: APIClient = {
      get: async (url: string) => {
        return await request.get(`${baseURL}${url}`, {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN || 'test-token'}`,
          },
        });
      },

      post: async (url: string, options?: any) => {
        return await request.post(`${baseURL}${url}`, {
          ...options,
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN || 'test-token'}`,
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        });
      },

      put: async (url: string, options?: any) => {
        return await request.put(`${baseURL}${url}`, {
          ...options,
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN || 'test-token'}`,
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        });
      },

      delete: async (url: string) => {
        return await request.delete(`${baseURL}${url}`, {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN || 'test-token'}`,
          },
        });
      },
    };

    await use(client);
  },
});

export { expect } from '@playwright/test';
