import { Page } from '@playwright/test';

/**
 * Wait Utilities
 * 
 * Helper functions for waiting in tests
 */

/**
 * Wait for a specific time in milliseconds
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait for element to be visible and stable (not animating)
 */
export async function waitForElementStable(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  
  // Wait a bit for animations to complete
  await wait(300);
}

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Poll until condition is met
 */
export async function waitUntil(
  condition: () => Promise<boolean>,
  options: { timeout?: number; interval?: number } = {}
): Promise<void> {
  const { timeout = 5000, interval = 100 } = options;
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await wait(interval);
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}
