import { test, expect } from '@playwright/test';

test.describe('Platform Operational Workflows', () => {
  test('Admin can login and view analytics', async ({ page }) => {
    await page.goto('/login');
    
    // Fill login form
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:has-text("Sign In")');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Dashboard Overview')).toBeVisible();

    // Navigate to Analytics
    await page.click('text=Admin Analytics');
    await expect(page).toHaveURL(/.*admin\/analytics/);
    await expect(page.locator('text=Business Intelligence Hub')).toBeVisible();
  });

  test('Connector can onboard a new lead (Mobile View)', async ({ page, isMobile }) => {
    // This will run on Mobile Chrome project
    await page.goto('/login');
    await page.fill('input[type="email"]', 'connector@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button:has-text("Sign In")');

    await page.goto('/connector/onboard');
    await expect(page.locator('text=Add New Lead')).toBeVisible();

    // Step 1: Details
    await page.fill('input[placeholder="As per PAN card"]', 'John Doe');
    await page.fill('input[placeholder="98765 43210"]', '9876543210');
    await page.click('button:has-text("Next")');

    // Step 2: KYC
    await expect(page.locator('text=PAN Number')).toBeVisible();
    await page.fill('input[placeholder="ABCDE1234F"]', 'ABCDE1234F');
    await page.click('button:has-text("Next")');

    // Verify progress
    await expect(page.locator('.ant-steps-item-active text=Income')).toBeVisible();
  });
});
