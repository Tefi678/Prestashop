import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test('Buscar "poster" y comprar el tercer artículo', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  
  await homePage.navigateTo();
  await homePage.searchProduct('poster');

  // Seleccionamos el tercer item (index 2) de los resultados
  const posters = page.locator('.product-miniature');
  await posters.nth(2).click(); 

  await productPage.addProductWithQuantity(1);

  await expect(page.locator('.modal-title')).toContainText('successfully added');
});