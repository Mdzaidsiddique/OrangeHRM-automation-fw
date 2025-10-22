import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import logger from '../utils/Logger.js';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const { username, password } = test.info().project.use.extraHTTPHeaders;
    const baseURL = test.info().project.use.baseURL;
    const loginPage = new LoginPage(page);

    logger.info('Logging in through fixture...');
    await loginPage.pagelaunch(baseURL);
    await loginPage.login(username, password);
    await use(page);
  },
});

export { expect } from '@playwright/test';
