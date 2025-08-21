import { test, expect } from '@playwright/test';

test('should navigate to the registration page and display the form', async ({ page }) => {
  await page.goto('http://localhost:3000/cadastro');

  await expect(page.locator('h1')).toHaveText('Cadastro');

  await expect(page.locator('label[for="name"]')).toHaveText('Nome');
  await expect(page.locator('input#name')).toBeVisible();

  await expect(page.locator('label[for="email"]')).toHaveText('Email');
  await expect(page.locator('input#email')).toBeVisible();

  await expect(page.locator('label[for="password"]')).toHaveText('Senha');
  await expect(page.locator('input#password')).toBeVisible();

  await expect(page.locator('label[for="confirmPassword"]')).toHaveText('Confirmar Senha');
  await expect(page.locator('input#confirmPassword')).toBeVisible();

  await expect(page.locator('button[type="submit"]')).toHaveText('Cadastrar');

  await expect(page.locator('a[href="/login"]')).toHaveText('Faça login');
});

test('should allow a user to type into the registration form', async ({ page }) => {
  await page.goto('http://localhost:3000/cadastro');

  await page.locator('input#name').type('Test User');
  await expect(page.locator('input#name')).toHaveValue('Test User');

  await page.locator('input#email').type('test@example.com');
  await expect(page.locator('input#email')).toHaveValue('test@example.com');

  await page.locator('input#password').type('password123');
  await expect(page.locator('input#password')).toHaveValue('password123');

  await page.locator('input#confirmPassword').type('password123');
  await expect(page.locator('input#confirmPassword')).toHaveValue('password123');
});

test('should show an alert if passwords do not match', async ({ page }) => {
  await page.goto('http://localhost:3000/cadastro');

  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('As senhas não conferem!');
    await dialog.dismiss();
  });

  await page.locator('input#password').type('password123');
  await page.locator('input#confirmPassword').type('password456');
  await page.locator('button[type="submit"]').click();
});
