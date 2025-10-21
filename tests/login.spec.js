import {test} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test("test login scenario", async ({page})=>{
    const loginPage = new LoginPage(page);

    // Get values from global config
    const { username, password } = test.info().project.use.extraHTTPHeaders;
    const baseURL = test.info().project.use.baseURL;

    await loginPage.pagelaunch(baseURL);
    await loginPage.login(username, password);
});