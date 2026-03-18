import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Punto 4: Navegación por Categorías', () => {

  test('Debe navegar a Clothes > Women y realizar una compra', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // 1. Navegar al inicio
    await homePage.navigateTo();

    // 2. Usar la navegación estructurada de HomePage (maneja el hover y click)
    await homePage.navigateToWomenCategory();

    // 3. Validación de llegada a la categoría correcta
    const categoryHeader = page.locator('.h1');
    await expect(categoryHeader).toContainText('Women');

    // 4. Seleccionar el primer producto de la lista filtrada
    await productPage.selectProductFromList(0);

    // 5. Agregar al carrito y proceder
    await productPage.addProductWithQuantity(1);

    // 6. Completar el checkout (Paso crítico para "realizar una compra")
    await productPage.completeFullCheckout();

    // 7. Validación final en el reporte
    await expect(page.locator('#content-order-confirmation-title')).toBeVisible();
    await expect(page.locator('#content-order-confirmation-title')).toContainText('CONFIRMED');
  });
});