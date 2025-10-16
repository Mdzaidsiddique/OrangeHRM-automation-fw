import {test} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import fs from 'fs';

const ENV = process.env.ENV || 'qa';
const envData = JSON.parse(fs.readFileSync(`./config/${ENV}.json`));

test("test login scenario", async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.pagelaunch("https://opensource-demo.orangehrmlive.com");
    await loginPage.login(envData.username, envData.password);
});