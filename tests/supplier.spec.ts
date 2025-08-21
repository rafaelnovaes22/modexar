import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // For now, we will just navigate to the page directly.
  // In a real application, we would have to log in first.
  await page.goto('http://localhost:3000/dashboard/fornecedores');
});

test('should navigate to the suppliers page and display the form and list', async ({ page }) => {
  await expect(page.locator('h1')).toHaveText('Gestão de Fornecedores');

  await expect(page.locator('h2').first()).toHaveText('Cadastrar Novo Fornecedor');
  await expect(page.locator('form')).toBeVisible();

  await expect(page.locator('h2').last()).toHaveText('Fornecedores Cadastrados');
  await expect(page.locator('table')).toBeVisible();
});

test('should allow a user to type into the supplier form', async ({ page }) => {
  await page.locator('input#nome').type('Fornecedor Teste');
  await expect(page.locator('input#nome')).toHaveValue('Fornecedor Teste');

  await page.locator('input#cnpj').type('12.345.678/0001-90');
  await expect(page.locator('input#cnpj')).toHaveValue('12.345.678/0001-90');

  await page.locator('input#contato_whatsapp').type('11987654321');
  await expect(page.locator('input#contato_whatsapp')).toHaveValue('11987654321');

  await page.locator('input#email').type('fornecedor@teste.com');
  await expect(page.locator('input#email')).toHaveValue('fornecedor@teste.com');

  await page.locator('input#endereco').type('Rua de Teste, 123');
  await expect(page.locator('input#endereco')).toHaveValue('Rua de Teste, 123');
});
