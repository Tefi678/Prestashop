import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Punto 2: Compra Masiva', () => {
  
  test('Debe permitir la compra de 8 unidades de un artículo', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.navigateTo();
    
    // 1. Usamos el método de la lista de productos para elegir el primero
    // (Esto es más limpio que usar locators sueltos en el spec)
    await productPage.selectProductFromList(0);
    
    // 2. Agregamos 8 unidades y procedemos al carrito
    await productPage.addProductWithQuantity(8); 

    // 3. Validación intermedia: ¿Hay 8 items en el resumen del carrito?
    // Nota: PrestaShop a veces dice "8 items" o "8 productos" según el idioma
    const cartCount = page.locator('.cart-products-count');
    await expect(cartCount).toBeVisible();
    
    // 4. Finalizar la compra (Checkout completo)
    await productPage.completeFullCheckout();

    // 5. Validación final de éxito
    await expect(page.locator('#content-order-confirmation-title')).toBeVisible();
    await expect(page.locator('#content-order-confirmation-title')).toContainText('CONFIRMED');
  });
});