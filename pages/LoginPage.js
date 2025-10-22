import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import logger from '../utils/Logger.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.userNameInputField = "//input[@placeholder='Username']";
    this.passwordInputField = "//input[@placeholder='Password']";
    this.loginButton = "//button[normalize-space()='Login']";
    this.dashboardText = "//h6[normalize-space()='Dashboard']";
  }

  async pagelaunch(url) {
    logger.info(`Navigating to URL: ${url}`);
    await this.goto(url); // use BasePage method
  }

  async login(username, password) {
    logger.info(`Attempting login with username: ${username}`);
    await this.fill(this.userNameInputField, username, 'Username Field');
    await this.fill(this.passwordInputField, password, 'Password Field');
    await this.click(this.loginButton, 'Login Button');
    await this.verifyVisible(this.dashboardText, 'Dashboard Header');
    logger.info('Login successful');
  }
}
