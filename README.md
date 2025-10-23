# OrangeHRM Playwright Automation Framework
### An End-to-End Test Automation using Playwright (JavaScript)

- This project is a **Playwright-based end-to-end automation testing framework** designed for the **Demo OrangeHRM web application**.  
- It follows modern automation principles — **Page Object Model (POM)** architecture, **Fixtures for reusability**, **Allure reporting**, and **Winston-based logging**.  
- The framework is fully integrated with **Jenkins CI/CD** for automated execution across multiple environments and browsers.

The framework supports:
- 🔹 Multi-environment testing (`qa`, `staging`, `prod`)
- 🔹 Multi-browser testing (`Chromium`, `Firefox`, `WebKit`)
- 🔹 Tag-based test execution
- 🔹 Logging and reporting via **Winston** and **Allure Reports**
- 🔹 Modular structure using **BasePage** and **Fixtures**

```
📁 OrangeHRM-Automation
│
├── 📁 config/               # Environment configs (qa.json, staging.json, prod.json)
│
├── 📁 pages/                # Page Objects (LoginPage, DashboardPage, etc.)
│   ├── BasePage.js
│   └── LoginPage.js
│
├── 📁 tests/                # Test scripts
│   └── login.spec.js
│
├── 📁 fixtures/             # Custom fixtures for reusable setup (login, environment)
│   └── baseTest.js
│
├── 📁 utils/                # Reusable helpers (Logger, utilities)
│   └── Logger.js
│
├── 📁 reports/              # Generated reports (Allure, HTML)
│
├── 📁 logs/                 # Rotating execution logs
│
├── playwright.config.js     # Playwright configuration (envs, browsers, reporting)
├── Jenkinsfile              # Jenkins CI/CD pipeline
├── package.json             # Dependencies & npm scripts
└── README.md                # Documentation
```
