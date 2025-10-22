import { BasePage } from './BasePage.js';

export class PimPage extends BasePage {
  constructor(page) {
    super(page);
    this.pimText = "//h6[normalize-space()='PIM']";
    this.addEmployeeButton = "//a[normalize-space()='Add Employee']";
    this.addEmployeeText = "//h6[normalize-space()='Add Employee']";
    this.employeeListText = "//a[normalize-space()='Employee List']";
  }

  async clickOnAddEmployee() {
    await this.click(this.addEmployeeButton, 'Add Employee Button');
    await this.verifyVisible(this.addEmployeeText, 'Add Employee Heading');
  }

  async clickOnEmployeeList() {
    await this.click(this.employeeListText, 'Employee List Button');
    await this.verifyVisible(this.pimText, 'PIM Text');
  }
}