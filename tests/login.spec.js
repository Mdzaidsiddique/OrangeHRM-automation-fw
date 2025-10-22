import { test } from '../fixtures/fixtures.js';
import { LoginPage } from '../pages/LoginPage.js';
import logger from '../utils/Logger.js';

test('@sanity Verify login works', async ({ page }) => {
  const { username, password } = test.info().project.use.extraHTTPHeaders;
  const baseURL = test.info().project.use.baseURL;

  const loginPage = new LoginPage(page);
  await loginPage.pagelaunch(baseURL);
  await loginPage.login(username, password);

  logger.info('Login test completed successfully');
});
