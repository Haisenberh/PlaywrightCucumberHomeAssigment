import { Page, type Locator } from './base';
import { config } from '../config/index';

export class RegistrationPage {

  readonly page: Page;
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly acceptTermsCheckbox: Locator;
  readonly errorMessage: Locator;
  readonly url: string;


  constructor(page: Page) {
    this.url = config.HOST + '/register';
    this.page = page;
    this.userNameInput = page.getByLabel('Username');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.acceptTermsCheckbox = page.getByRole('checkbox');
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async registerNewUser(email: string, password: string, userName: string) {
    await this.userNameInput.fill(userName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.acceptTermsCheckbox.check();
    await this.registerButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }
}