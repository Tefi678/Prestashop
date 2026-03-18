import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly languageSelector: Locator;
  readonly userIcon: Locator;
  readonly menuClothes: Locator;
  readonly submenuWomen: Locator;

  constructor(page: Page) {
    super(page);
    this.userIcon = this.storeFrame.locator('.user-info a[title*="Log in"]');
    this.searchInput = this.storeFrame.getByPlaceholder('Search our catalog');
    this.languageSelector = this.storeFrame.locator('.language-selector');
    this.menuClothes = this.storeFrame.locator('#category-3');
    this.submenuWomen = this.storeFrame.locator('#category-9');
  }

  async goToLogin() {
    await this.clickOn(this.userIcon);
  }

  async searchProduct(term: string) {
    await this.fillInput(this.searchInput, term);
    await this.page.keyboard.press('Enter');
    // Esperamos a que la URL cambie para asegurar que la búsqueda procesó
    await this.page.waitForURL(/controller=search/);
  }

  async changeLanguage(lang: string) {
    await this.clickOn(this.languageSelector);
    // Buscamos el link que contiene el texto del idioma (ej: "Español")
    const langOption = this.page.locator(`ul.dropdown-menu li a:has-text("${lang}")`);
    await this.clickOn(langOption);
  }

  // Método específico para el Punto 4
  async navigateToWomenCategory() {
    await this.menuClothes.hover(); // Hover para desplegar el menú si es necesario
    await this.clickOn(this.submenuWomen);
  }
}