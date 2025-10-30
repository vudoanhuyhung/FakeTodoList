import { test, expect } from '@playwright/test';

test('Test Case: Login flow', async ({ page }) => {
  await page.goto('https://fake-todo-list.vercel.app/login');
  const emailInput = page.getByPlaceholderText('Email');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@example.com');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.logged-in');
  await expect(page.locator('.logged-in')).toBeVisible();
});