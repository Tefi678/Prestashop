import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly confirmationModal: Locator;

  constructor(page: Page) {
    super(page);
    this.quantityInput = page.locator('#quantity_wanted');
    this.addToCartBtn = page.locator('.add-to-cart');
    this.proceedToCheckoutBtn = page.getByRole('link', { name: ' Proceed to checkout' });
    this.confirmationModal = page.locator('#blockcart-modal');
  }

  async addProductWithQuantity(quantity: number) {
    // Limpiamos el input antes de escribir la cantidad
    await this.quantityInput.click({ clickCount: 3 });
    await this.quantityInput.fill(quantity.toString());
    await this.addToCartBtn.click();
    
    // Esperamos a que aparezca el modal de confirmación
    await this.confirmationModal.waitFor({ state: 'visible' });
    await this.proceedToCheckoutBtn.click();
  }
}