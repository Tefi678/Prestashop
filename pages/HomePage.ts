import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly languageSelector: Locator;
  readonly userIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder('Search our catalog');
    this.languageSelector = page.locator('.languages-dt');
    this.userIcon = page.getByRole('link', { name: ' Sign in' });
  }

  async searchProduct(term: string) {
    await this.fillInput(this.searchInput, term);
    await this.page.keyboard.press('Enter');
  }

  async changeLanguage(lang: string) {
    await this.clickOn(this.languageSelector);
    await this.page.getByRole('link', { name: lang }).click();
  }
} 