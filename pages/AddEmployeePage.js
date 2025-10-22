import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class AddEmployeePage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInputField = "//input[@name='firstName']";
    this.middleNameInputField = "//input[@name='middleName']";
    this.lastNameInputField = "//input[@name='lastName']";
    this.employeeIdInputField = "//label[normalize-space()='Employee Id']/following::input[1]";
    this.saveButton = "//button[normalize-space()='Save']";
  }

  async addEmployee(firstName, middleName, lastName, employeeId) {
    await this.fill(this.firstNameInputField, firstName, 'First Name');
    await this.fill(this.middleNameInputField, middleName, 'Middle Name');
    await this.fill(this.lastNameInputField, lastName, 'Last Name');
    await this.fill(this.employeeIdInputField, employeeId + 10, 'Employee ID');
    await this.click(this.saveButton, 'Save Button');
    await this.page.waitForLoadState('networkidle'); // wait until page/network settles
    await this.page.waitForTimeout(1000); // small optional wait if UI animation exists
    await expect.soft(this.page.locator(`//h6[normalize-space()='${firstName} ${lastName}']`)).toBeVisible({ timeout: 10000 });
  }
}
