import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

// Environment Configuration
const ENV = process.env.ENV || 'qa'; // default: QA
const configFile = `./config/${ENV}.json`;
const envConfig = JSON.parse(fs.readFileSync(configFile));

// Playwright Test Configuration
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

 // CI Configuration
  forbidOnly: !!process.env.CI,          // Fail build if test.only is left in code
  retries: process.env.CI ? 2 : 0,       // Retry failed tests on CI
  workers: process.env.CI ? 1 : undefined, // Run single worker on CI for stability

// Reporters
  // reporter: 'html',[['line'],['allure-playwright']],
  reporter: [
    ['list'], // simple console reporter
    ['allure-playwright'], // allure reporter
  ],

  // Shared Test Settings
  use: {
    baseURL: envConfig.baseURL,
    headless: true,               // Set to true for CI
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 0,             // No limit for actions
    navigationTimeout: 30000,     // 30 seconds for navigation  
  },

  // Browser Projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ]
});
