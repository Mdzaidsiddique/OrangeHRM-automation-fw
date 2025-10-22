import { test } from '../fixtures/fixtures.js';
import { LeftSideNav } from '../pages/LeftSideNav.js';

test.describe('Left Side Navigation', () => {
  test('@smoke Navigate to Admin', async ({ loggedInPage }) => {
    const leftNav = new LeftSideNav(loggedInPage);
    await leftNav.navigateToOption('Admin');
  });

  test('@smoke Navigate to PIM', async ({ loggedInPage }) => {
    const leftNav = new LeftSideNav(loggedInPage);
    await leftNav.navigateToOption('PIM');
  });

  test('@regression Search and navigate via search bar', async ({ loggedInPage }) => {
    const leftNav = new LeftSideNav(loggedInPage);
    await leftNav.enterSearchText('Leave');
  });
});
