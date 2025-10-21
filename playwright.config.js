import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

// Environment Configuration
const env = process.env.ENV || 'qa';
const configFilePath = `./config/${env}.json`;
if (!fs.existsSync(configFilePath)) {
  throw new Error(`Config file not found for environment: ${env}`);
}
const envConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

// Playwright Test Configuration
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,


// Reporters
  reporter: [
    ['list'], // simple console reporter
    ['allure-playwright'], // allure reporter
  ],

  // Shared Test Settings
  use: {
    baseURL: envConfig.baseURL,
    extraHTTPHeaders: {
      username: envConfig.username,
      password: envConfig.password
    },
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
