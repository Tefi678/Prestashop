import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Punto 3: Localización e Idioma', () => {
  
  test('Debe cambiar el idioma de la interfaz a Español y verificar traducciones', async ({ page }) => {
    const homePage = new HomePage(page);

    // 1. Navegación inicial (por defecto suele cargar en English)
    await homePage.navigateTo();

    // 2. Usamos el método centralizado de la HomePage
    // Esto maneja internamente el clic en el dropdown y la selección del link
    await homePage.changeLanguage('Español');

    // 3. Verificaciones de traducción (Assertions)
    
    // Validación 1: El placeholder del buscador (tu idea original, muy buena)
    const searchPlaceholder = page.getByPlaceholder('Buscar en nuestro catálogo');
    await expect(searchPlaceholder).toBeVisible();

    // Validación 2: Texto en el footer o links de usuario (opcional pero robusto)
    const contactLink = page.locator('#contact-link');
    await expect(contactLink).toContainText('Contacte con nosotros');

    // Validación 3: URL (PrestaShop suele añadir el código de idioma /es/)
    await expect(page).toHaveURL(/.*\/es\/.*/);
  });
});