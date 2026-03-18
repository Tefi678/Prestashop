import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Cambiar el idioma del sitio a Español', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();

  // Abrir selector de idiomas
  await page.getByRole('button', { name: 'Language' }).click();
  await page.getByRole('link', { name: 'Español' }).click();

  // Validar que el botón de carrito cambió de nombre (u otro elemento clave)
  await expect(page.getByPlaceholder('Buscar en nuestro catálogo')).toBeVisible();
});