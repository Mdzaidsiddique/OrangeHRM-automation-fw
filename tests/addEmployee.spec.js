import { test } from '../fixtures/fixtures.js';
import { LeftSideNav } from '../pages/LeftSideNav.js';
import { PimPage } from '../pages/PimPage.js';
import { AddEmployeePage } from '../pages/AddEmployeePage.js';
import employeeData from '../test-data/employeeData.json';

test.describe.only('Add Employee Tests', () => {
  test('@sanity Add a new employee', async ({ loggedInPage }) => {
    const leftNav = new LeftSideNav(loggedInPage);
    await leftNav.navigateToOption('PIM');

    const pimPage = new PimPage(loggedInPage);
    await pimPage.clickOnAddEmployee();

    const addEmpPage = new AddEmployeePage(loggedInPage);
    await addEmpPage.addEmployee(
      employeeData.firstName,
      employeeData.middleName,
      employeeData.lastName,
      employeeData.employeeId
    );
  });
});
