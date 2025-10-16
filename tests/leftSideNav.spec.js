import {test, expect} from '@playwright/test';
import {LeftSideNav} from '../pages/LeftSideNav';
import {LoginPage} from '../pages/LoginPage';
import { log } from 'console';
import fs from 'fs';

const ENV = process.env.ENV || 'qa';
const envData = JSON.parse(fs.readFileSync(`./config/${ENV}.json`));

test.describe("Left side navigation tests", ()=>{
    test.beforeEach("login", async ({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.pagelaunch("https://opensource-demo.orangehrmlive.com");
        await loginPage.login(envData.username, envData.password);
    });

    test("search and navigate to Admin option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.enterSearchText("Admin");
    });

    test("navigate to Admin option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Admin");
    });

    test("navigate to PIM option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("PIM");
    });

    test("navigate to Leave option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Leave");
    });

    test("navigate to Time option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Time");
    });

    test("navigate to Recruitment option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Recruitment");
    });

    test.fixme("navigate to My Info option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("My Info");
        log("This test is broken due to a locator issue");
    });

    test("navigate to Performance option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Performance");
    });

    test.fixme("navigate to Dashboard option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Dashboard");
        log("This test is broken due to a locator issue");
        
    });

    test("navigate to Directory option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Directory");
    });

    test.fixme("navigate to Maintenance option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Maintenance");
        log("This test is broken due to a locator issue");
    });

    test("navigate to Claim option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Claim");
    });

    test("navigate to Buzz option", async ({page})=>{
        const leftSideNav = new LeftSideNav(page);
        await leftSideNav.navigateToOption("Buzz");
    });

    test.afterEach(async ({page})=>{
        await page.close();
    });
});
