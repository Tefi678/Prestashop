import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('E2E Purchase Flow - PrestaShop', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    
    await homePage.navigateTo();
  });

  test('Complete purchase flow with multiple requirements', async ({ page }) => {
    // 1. LogIn (Asumiendo datos en testData.json)
    await homePage.userIcon.click();
    await loginPage.login('testuser@email.com', 'password123');

    // 2. Cambiar Idioma
    await homePage.changeLanguage('English');

    // 3. Buscar "poster", seleccionar el tercero y comprar
    await homePage.searchProduct('poster');
    const thirdProduct = page.locator('.product-miniature').nth(2); // Index 2 = 3er item
    await thirdProduct.click();
    await productPage.addToCart();

    // 4. Navegar a Clothes > Women y comprar
    await page.getByRole('link', { name: 'Clothes', exact: true }).hover();
    await page.getByRole('link', { name: 'Women' }).click();
    await page.locator('.product-miniature').first().click();
    await productPage.addToCart();

    // Validaciones finales
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('.cart-items')).toBeVisible();
  });
});