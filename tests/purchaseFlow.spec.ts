import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('E2E Purchase Flow - PrestaShop', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    
    // Navegación inicial centralizada
    await homePage.navigateTo();
  });

  test('Debe completar un flujo de compra complejo con múltiples criterios', async ({ page }) => {
    // 1. Acceder (Punto 1)
    await homePage.goToLogin();
    await loginPage.login('testuser@email.com', 'password123');
    // Validamos que el login fue exitoso antes de seguir
    await expect(page.locator('.logout')).toBeVisible();

    // 2. Cambiar Idioma a Inglés (Punto 3)
    await homePage.changeLanguage('English');

    // 3. Buscar "poster", seleccionar el tercero y añadir al carrito (Punto 5)
    await homePage.searchProduct('poster');
    await productPage.selectProductFromList(2); // Selecciona el 3er item
    await productPage.addProductWithQuantity(1);
    
    // Volver a la home para la siguiente acción
    await homePage.navigateTo();

    // 4. Navegar a Clothes > Women y añadir otro producto (Punto 4)
    await homePage.navigateToWomenCategory();
    await productPage.selectProductFromList(0); // Selecciona el primero de la categoría
    await productPage.addProductWithQuantity(1);

    // 5. Finalizar Compra y Validaciones finales
    await productPage.completeFullCheckout();

    // Verificación final en el reporte de Playwright
    const confirmation = page.locator('#content-order-confirmation-title');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toContainText(['CONFIRMED', 'CONFIRMADA']); 
  });
});