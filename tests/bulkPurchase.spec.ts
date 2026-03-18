import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test('Realizar compra de 8 artículos específicos', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  
  await homePage.navigateTo();
  
  // Seleccionamos un producto base y pedimos 8 unidades
  await page.locator('.product-miniature').first().click();
  await productPage.addProductWithQuantity(8); 

  await expect(page.locator('.cart-products-count')).toContainText('8 items');
});