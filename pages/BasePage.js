import { expect } from '@playwright/test';
import logger from '../utils/Logger.js';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator, name = '') {
    logger.info(`Clicking on ${name || locator}`);
    await this.page.locator(locator).click();
  }

  async fill(locator, value, name = '') {
    logger.info(`Filling ${name || locator} with value: ${value}`);
    await this.page.locator(locator).fill(value);
  }

  async verifyVisible(locator, name = '') {
    logger.info(`Verifying visibility of ${name || locator}`);
    await expect(this.page.locator(locator)).toBeVisible({ timeout: 20000 });
  }

  async waitForElement(locator, name = '') {
    logger.info(`Waiting for element ${name || locator}`);
    await this.page.waitForSelector(locator, { timeout: 20000 });
  }
}
