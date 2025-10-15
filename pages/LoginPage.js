import {expect} from '@playwright/test';

export class LoginPage {
    constructor(page){
        this.page = page;
        this.userNameInputField = "//input[@placeholder='Username']";
        this.passwordInputField = "//input[@placeholder='Password']";
        this.loginButton = "//button[normalize-space()='Login']";
        this.forgotPasswordLink = "//a[normalize-space()='Forgot your password?']";
        this.dashboardText = "//h6[normalize-space()='Dashboard']";
    }

    async pagelaunch(url){
        await this.page.goto(url);
    }

    async login(username, password){
        await this.page.fill(this.userNameInputField, username);
        await this.page.locator(this.passwordInputField).fill(password);
        await this.page.locator(this.loginButton).click();
        await expect(this.page.locator(this.dashboardText)).toBeVisible();
    }
};