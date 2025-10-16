import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {AddEmployeePage} from '../pages/addEmployeePage';
import credentials from '../test-data/credentials.json';
import employeeData from '../test-data/employeeData.json';
import { LeftSideNav } from '../pages/LeftSideNav';
import { log } from 'console';
import { PimPage } from '../pages/PimPage';
import fs from 'fs';

const ENV = process.env.ENV || 'qa';
const envData = JSON.parse(fs.readFileSync(`./config/${ENV}.json`));

test.describe("Add Employee tests", ()=>{
    test.beforeEach("login", async ({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.pagelaunch("https://opensource-demo.orangehrmlive.com");
        await loginPage.login(envData.username, envData.password);
    });

    test("add employee", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("PIM");
        const pimPage = new PimPage(page);
        await pimPage.addEmployeeButtonClick();
        const addEmployeePage = new AddEmployeePage(page);
        await addEmployeePage.addEmployee(employeeData.firstName, employeeData.middleName, employeeData.lastName, employeeData.employeeId);
        log("Employee added successfully");
    });

    test.afterEach(async ({page})=>{
        await page.screenshot({path: `screenshots/${Date.now()}_addEmployee.png`});
        await page.close();
    });
});