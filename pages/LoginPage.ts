import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email', { exact: true });
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.signInBtn = page.locator('#submit-login');
    this.createAccountLink = page.getByRole('link', { name: 'No account? Create one here' });
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInBtn.click();
  }
}