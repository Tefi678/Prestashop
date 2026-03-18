import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Autenticación en PrestaShop', () => {
  test('Crear una cuenta nueva y acceder', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('?controller=authentication&create_account=1');
    
    // Usamos un generador de correo aleatorio para evitar conflictos
    const email = `qa_engineer_${Date.now()}@test.com`;
    
    await page.getByLabel('Mr.').check();
    await page.getByPlaceholder('First name').fill('Test');
    await page.getByPlaceholder('Last name').fill('User');
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill('Password123!');
    await page.getByLabel('Customer data privacy').check();
    
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Validación de sesión activa
    await expect(page.getByRole('link', { name: ' Sign out' })).toBeVisible();
  });
});