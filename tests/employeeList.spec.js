import { test } from '../fixtures/fixtures.js';
import {PimPage} from '../pages/PimPage';
import {LeftSideNav} from '../pages/LeftSideNav';
import { saveToJSON } from '../utils/jsonHelper.js';

test.fixme('Save Employee List to JSON', async ({ page }) => {
    const leftSideNav = new LeftSideNav(page);
    await leftSideNav.navigateToOption('PIM');
    const pimPage = new PimPage(page);
    await pimPage.clickOnEmployeeList();

    await page.waitForSelector("//div[@role='table']");
  
  /*Get all rows except header
  const rows = "get all the row and extract each cell data into an object with fields: 
  id, firstAndMiddleName, lastName, jobTitle, employmentStatus, subUnit, supervisor" */
  saveToJSON(rows, 'EmployeeList');
});
