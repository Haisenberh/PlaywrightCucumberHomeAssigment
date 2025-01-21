import { Page, type Locator, expect } from './base.ts';
import { config } from './../config/index.ts';

export class ProductPage {
  url = config.HOST + "products";

  readonly page: Page;
  readonly cartIsEmptyMessage: Locator;
  readonly makeOrderTitle: Locator;
  readonly photoList: Locator;
  readonly payButton: Locator;
  readonly clearCartButton: Locator;
  readonly paymentSuccessMessage: Locator;
  readonly fourBySixPackageSelector: Locator;
  readonly sixByTwelvePackageSelector: Locator;
  readonly orderTotalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIsEmptyMessage = page.getByText('Your cart is empty');
    this.makeOrderTitle = page.getByText('Make an order');
    this.photoList = page.getByText('$5.004x6$7.006x12$5.002x6')
    this.photoList = page.getByLabel('Ain\'t nobody got time for')
    this.payButton = page.getByRole('button', { name: 'Pay' })
    this.clearCartButton = page.getByRole('button', { name: 'Clear cart' })
    this.fourBySixPackageSelector = page.locator('.package__item-photo').first()
    this.sixByTwelvePackageSelector = page.locator('div:nth-child(2) > .package__item > .package__item-photo').first()
    this.orderTotalLabel = page.locator('span').filter({ hasText: 'Total: $' })
    this.paymentSuccessMessage = page.getByText('Payment is done')
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }
}