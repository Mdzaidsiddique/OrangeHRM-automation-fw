import {test} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import credentials from '../test-data/credentials.json';

test("test login scenario", async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.pagelaunch("https://opensource-demo.orangehrmlive.com");
    await loginPage.login(credentials.username, credentials.password);
});