import { Page, type Locator } from './base';
import { config } from '../config/index';

export class HomePage {
  readonly page: Page;
  readonly registrationNumber: Locator;
  readonly url: string;

  constructor(page: Page) {
    this.page = page;
    this.url = config.HOST + '/home';
    this.registrationNumber = page.getByTestId('registration-number');
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }


  async getRegistrationNumber(){
    return await this.registrationNumber.innerText();
  }

}
