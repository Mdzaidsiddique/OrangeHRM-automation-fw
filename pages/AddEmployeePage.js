import { expect } from "@playwright/test";

export class AddEmployeePage {
    constructor(page){
        this.page = page;
        // this.imageUpload = "//input[@type='file']";
        this.firstNameInputField = "//input[@name='firstName']";
        this.middleNameInputField = "//input[@name='middleName']";
        this.lastNameInputField = "//input[@name='lastName']";
        this.employeeIdInputField = "//label[normalize-space()='Employee Id']/following::input[1]";
        // this.create login detils toggle button
        this.saveButton = "//button[normalize-space()='Save']";
        // this.userNameHeadingOnEmpListPage = "//h6[normalize-space()='{firstName} {middleName} {lastName}']";
    };

    async addEmployee(firstName, middleName, lastName, employeeId){
        await this.page.fill(this.firstNameInputField, firstName);
        await this.page.fill(this.middleNameInputField, middleName);
        await this.page.fill(this.lastNameInputField, lastName);
        await this.page.fill(this.employeeIdInputField, employeeId+1);
        await this.page.click(this.saveButton);
        await expect(this.page.locator(`//h6[normalize-space()='${firstName} ${lastName}']`)).toBeVisible({timeout: 10000});
    } 
};