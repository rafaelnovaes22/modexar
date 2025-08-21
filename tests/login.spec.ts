import { test, expect } from '@playwright/test';

test('should navigate to the login page and display the form', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await expect(page.locator('h1')).toHaveText('Login');

  await expect(page.locator('label[for="email"]')).toHaveText('Email');
  await expect(page.locator('input#email')).toBeVisible();

  await expect(page.locator('label[for="password"]')).toHaveText('Senha');
  await expect(page.locator('input#password')).toBeVisible();

  await expect(page.locator('button[type="submit"]')).toHaveText('Entrar');

  await expect(page.locator('a[href="/cadastro"]')).toHaveText('Cadastre-se');
});

test('should allow a user to type into the login form', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.locator('input#email').type('test@example.com');
  await expect(page.locator('input#email')).toHaveValue('test@example.com');

  await page.locator('input#password').type('password123');
  await expect(page.locator('input#password')).toHaveValue('password123');
});
