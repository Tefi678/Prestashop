import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Selectores de Ficha de Producto
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly proceedToCheckoutBtn: Locator;
  
  // Selectores de Lista/Catálogo (Punto 5)
  readonly productList: Locator;

  // Selectores de Checkout (Para completar la compra)
  readonly cartProceedBtn: Locator;
  readonly confirmAddressBtn: Locator;
  readonly confirmDeliveryBtn: Locator;
  readonly paymentOptionPayByCheck: Locator;
  readonly termsCheckbox: Locator;
  readonly orderBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.quantityInput = page.locator('#quantity_wanted');
    this.addToCartBtn = page.locator('.add-to-cart');
    this.proceedToCheckoutBtn = page.locator('div.cart-content-btn a.btn-primary');
    
    this.productList = page.locator('.product-miniature');

    // Checkout steps
    this.cartProceedBtn = page.locator('.cart-detailed-actions a');
    this.confirmAddressBtn = page.locator('button[name="confirm-addresses"]');
    this.confirmDeliveryBtn = page.locator('button[name="confirmDeliveryOption"]');
    this.paymentOptionPayByCheck = page.locator('#payment-option-1');
    this.termsCheckbox = page.locator('input#conditions_to_approve\\ homeslider'); // El ID puede variar según versión
    this.orderBtn = page.locator('#payment-confirmation button');
  }

  /**
   * Punto 5: Selecciona un producto de la lista por su posición (índice 0-base)
   */
  async selectProductFromList(index: number) {
    const targetProduct = this.productList.nth(index);
    await this.clickOn(targetProduct);
  }

  /**
   * Punto 2: Agrega cantidad específica y avanza
   */
  async addProductWithQuantity(quantity: number) {
    await this.fillInput(this.quantityInput, quantity.toString());
    await this.clickOn(this.addToCartBtn);
    // Esperamos al modal y procedemos
    await this.clickOn(this.proceedToCheckoutBtn);
  }

  /**
   * Completa el flujo de compra (Necesario para que el test sea "Realiza una compra")
   */
  async completeFullCheckout() {
    await this.clickOn(this.cartProceedBtn);
    
    // Si el usuario está logueado, estos pasos aparecen:
    if (await this.confirmAddressBtn.isVisible()) {
        await this.clickOn(this.confirmAddressBtn);
    }
    await this.clickOn(this.confirmDeliveryBtn);
    await this.paymentOptionPayByCheck.check();
    await this.page.locator('.condition-label input').check(); // Términos y condiciones
    await this.clickOn(this.orderBtn);
  }
}