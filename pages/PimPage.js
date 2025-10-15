import { expect } from "@playwright/test";

export class PimPage {
    constructor(page){
        this.page = page;
        this.pimText = "//h6[normalize-space()='PIM']";
        this.addEmployeeButton = "//a[normalize-space()='Add Employee']";
        this.addEmployeeText = "//h6[normalize-space()='Add Employee']";
        this.firstNameInputField = "//input[@name='firstName']";
        this.middleNameInputField = "//input[@name='middleName']";
        this.lastNameInputField = "//input[@name='lastName']";
        this.employeeIdInputField = "//label[normalize-space()='Employee Id']/following::input[1]";
        this.saveButton = "//button[normalize-space()='Save']";
        this.personalDetailsText = "//h6[normalize-space()='Personal Details']";
    };

    async addEmployeeButtonClick(){
        await this.page.click(this.addEmployeeButton);
        await expect(this.page.locator(this.addEmployeeText)).toBeVisible();
    }

    async addEmployee(firstName, middleName, lastName, employeeId){
        await this.page.fill(this.firstNameInputField, firstName);
        await this.page.fill(this.middleNameInputField, middleName);
        await this.page.fill(this.lastNameInputField, lastName);
        await this.page.fill(this.employeeIdInputField, employeeId);
        await this.page.click(this.saveButton);
        await expect(this.page.locator(this.personalDetailsText)).toBeVisible({timeout: 25000});
    } 
};