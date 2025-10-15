import { expect } from "@playwright/test";
export class LeftSideNav{
    constructor(page){
        this.page = page;
        this.searchInputField = "//input[@placeholder='Search']";
        this.adminOption = "//span[normalize-space()='Admin']";
        this.pimOption = "//span[normalize-space()='PIM']";
        this.leaveOption = "//span[normalize-space()='Leave']";
        this.timeOption = "//span[normalize-space()='Time']";
        this.recruitmentOption = "//span[normalize-space()='Recruitment']";
        this.myInfoOption = "//span[normalize-space()='My Info']";
        this.performanceOption = "//span[normalize-space()='Performance']";
        this.dashboardOption = "//span[normalize-space()='Dashboard']";
        this.directoryOption = "//span[normalize-space()='Directory']";
        this.maintenanceOption = "//span[normalize-space()='Maintenance']";
        this.claimOption = "//span[normalize-space()='Claim']";
        this.buzzOption = "//span[normalize-space()='Buzz']";
    }

    async enterSearchText(text){
        await this.page.fill(this.searchInputField, text);
        await this.page.locator(`//span[normalize-space()='${text}']`).click();
        await expect(this.page.locator(`//h6[normalize-space()='${text}']`)).toBeVisible({timeout: 25000});
    }

    async navigateToOption(optionName){
        this.page.click(`//span[normalize-space()='${optionName}']`);
        await expect(this.page.locator(`//h6[normalize-space()='${optionName}']`)).toBeVisible({timeout: 25000});
    }
}