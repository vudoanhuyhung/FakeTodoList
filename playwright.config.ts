import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: [
    'tests/**/*.{spec,test}.{ts,tsx,js,jsx,mjs,cjs}',
    'ai-generated-tests/**/*.{spec,test}.{ts,tsx,js,jsx,mjs,cjs}'
  ],

  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    actionTimeout: 0,
    trace: 'on-first-retry',
    headless: true,
  },

  // Launch a web server before the tests (Playwright will wait for the url).
  webServer: {
    command: 'npm run start:e2e',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});
