import { expect } from "@playwright/test";

export class EmployeeListPage {
    constructor(page){
        this.page = page;
        this.foundRecordTable = "";
    };
}