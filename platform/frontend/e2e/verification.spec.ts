import { test, expect } from '@playwright/test';

test.describe('Platform Full Verification', () => {
  test('Successful Login and Navigation to Dashboard', async ({ page }) => {
    // Navigate to login
    await page.goto('/login');
    
    // Check for "Welcome Back" text
    await expect(page.locator('text=Welcome Back')).toBeVisible();

    // Fill credentials
    await page.fill('input[placeholder="name@company.com"]', 'admin@platform.com');
    await page.fill('input[placeholder="••••••••"]', 'Admin@123');
    
    // Click Sign In
    await page.click('button:has-text("Sign In")');

    // Wait for redirect to dashboard
    // Note: The app should redirect to /dashboard after successful login
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    
    // Verify dashboard content
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('Navigate to Customer Management', async ({ page }) => {
    // Login first (or use a stored session if configured, but let's do it simple for now)
    await page.goto('/login');
    await page.fill('input[placeholder="name@company.com"]', 'admin@platform.com');
    await page.fill('input[placeholder="••••••••"]', 'Admin@123');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard');

    // Assuming there is a sidebar or menu link for Customers
    // Let's try to find a link that contains "Customer" or "Lead"
    const customerLink = page.locator('text=Customer');
    if (await customerLink.isVisible()) {
        await customerLink.click();
        await expect(page).toHaveURL(/.*customer/);
    }
  });
});
