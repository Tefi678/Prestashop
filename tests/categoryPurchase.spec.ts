import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('Comprar artículo desde Clothes > Women', async ({ page }) => {
  const productPage = new ProductPage(page);
  await page.goto('/');

  // Navegación por menú
  await page.getByRole('link', { name: 'Clothes', exact: true }).hover();
  await page.getByRole('link', { name: 'Women' }).click();

  await expect(page.getByRole('heading', { name: 'Women' })).toBeVisible();
  
  await page.locator('.product-miniature').first().click();
  await productPage.addProductWithQuantity(1);

  await expect(page.locator('.modal-title')).toContainText('Product successfully added');
});