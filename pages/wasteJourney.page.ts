import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/** * Login Page Object for WebDriverUniversity
 *
 * Represents the login page on WebDriverUniversity and encapsulates all login-related interactions
 *
 * */
export class WasteJourneyPage extends BasePage {
  // Locators
  readonly startJourney: Locator;
  readonly finishJourney: Locator;

  constructor(page: Page) {
    // super(page, '/Login-Portal/');
    super(page, '/');

    // Initialize locators
    this.startJourney = page.getByRole('button', { name: 'Démarrer un parcours' });
    this.finishJourney = page.getByRole('button', { name: 'Terminer le parcours' });
  }
}
