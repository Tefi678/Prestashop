import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Punto 1: Gestión de Usuarios', () => {
  
  test('Debe crear una cuenta nueva y mantener la sesión activa', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // 1. Navegar a la Home y luego al Login
    await homePage.navigateTo();
    await homePage.goToLogin();

    // 2. Generar datos únicos
    const uniqueEmail = `qa_student_${Date.now()}@ucatec.edu.bo`;
    const password = 'Password123!';

    // 3. Usar el método que creamos en LoginPage
    await loginPage.createAccount(
      'Juan', 
      'Pérez', 
      uniqueEmail, 
      password
    );

    // 4. Verificación (Assertion)
    // En PrestaShop, después de registrarse, el botón "Sign in" cambia a "Sign out" o aparece el nombre
    await expect(page.locator('.logout')).toBeVisible();
    await expect(page).toHaveURL(/controller=my-account/);
  });
});