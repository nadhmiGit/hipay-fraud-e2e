import { expect, Dialog } from '@playwright/test';
import { WasteJourneyPage } from '../pages/wasteJourney.page';
import { Given, Then, When } from './authentication/fixtures';

let wasteJourneyPage: WasteJourneyPage;
let dialogTextPromise: Promise<string>;

Given('I am on the waste journey page', async ({ page }) => {
  wasteJourneyPage = new WasteJourneyPage(page);
  await wasteJourneyPage.goto();
});

When('I start a waste journey', async ({ page }) => {
  await wasteJourneyPage.startJourney.click();
});

When('I complete the waste journey', async ({ page }) => {
  await wasteJourneyPage.finishJourney.click();
});
