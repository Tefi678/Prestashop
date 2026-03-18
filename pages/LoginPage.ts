import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page);
    // IMPORTANTE: Usar this.storeFrame
    this.emailInput = this.storeFrame.locator('section#login-form input[name="email"]');
    this.passwordInput = this.storeFrame.locator('section#login-form input[name="password"]');
    this.signInBtn = this.storeFrame.locator('#submit-login');
  }

  async login(email: string, pass: string) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, pass);
    await this.clickOn(this.signInBtn);
  }
}