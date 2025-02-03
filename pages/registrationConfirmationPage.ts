import { Page, type Locator, expect } from './base';

export class RegistrationConfirmationPage {

  readonly page: Page;
  readonly registrationNumber: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationNumber = page.getByTestId('registration-number');
    this.successMessage = page.getByTestId('success-message');
  }

  async getRegistrationNumber(): Promise<string> {
    return (await this.registrationNumber.innerText());
  }

  async isRegistrationNumberVisible(): Promise<boolean> {
    return (await this.registrationNumber.isVisible());
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.successMessage.innerText());
  }
}