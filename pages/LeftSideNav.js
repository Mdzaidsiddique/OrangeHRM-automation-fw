import { BasePage } from './BasePage.js';

export class LeftSideNav extends BasePage {
  constructor(page) {
    super(page);
    this.searchInputField = "//input[@placeholder='Search']";
  }

  async enterSearchText(text) {
    await this.fill(this.searchInputField, text, 'Search Field');
    await this.click(`//span[normalize-space()='${text}']`, `${text} option`);
    await this.verifyVisible(`//h6[normalize-space()='${text}']`, `${text} page header`);
  }

  async navigateToOption(optionName) {
    await this.click(`//span[normalize-space()='${optionName}']`, `${optionName} option`);
    await this.verifyVisible(`//h6[normalize-space()='${optionName}']`, `${optionName} page header`);
  }
}
