import { Page, Locator, FrameLocator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly storeFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.storeFrame = page.frameLocator('#framewrap');
  }

  async navigateTo(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  async clickOn(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.click();
  }

  async fillInput(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
}