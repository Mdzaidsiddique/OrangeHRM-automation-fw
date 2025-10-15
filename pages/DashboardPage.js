import expect from '@playwright/test';

export class DashboardPage {
    constructor(page){
        this.page = page;
        this.dashboardText = "//h6[normalize-space()='Dashboard']";
    }
};