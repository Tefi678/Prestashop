import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Punto 5: Búsqueda Avanzada y Selección por Índice', () => {

  test('Debe buscar "poster", seleccionar el tercer resultado y comprar', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    // 1. Navegación e inicio de búsqueda
    await homePage.navigateTo();
    await homePage.searchProduct('poster');

    // 2. Validación de resultados de búsqueda
    // Esperamos a que la grilla de productos sea visible antes de interactuar
    await expect(page.locator('.products')).toBeVisible();

    // 3. Seleccionamos el tercer ítem (índice 2) usando el método de nuestra Page
    await productPage.selectProductFromList(2);

    // 4. Agregar al carrito (1 unidad por defecto o la que gustes)
    await productPage.addProductWithQuantity(1);

    // 5. Finalizar la transacción completa
    await productPage.completeFullCheckout();

    // 6. Validación final de la orden confirmada
    const confirmationTitle = page.locator('#content-order-confirmation-title');
    await expect(confirmationTitle).toContainText('CONFIRMED');
  });
});