import { Page, type Locator } from './base.ts';
import { config } from './../config/index.ts';

export class PhotoBoothPage {
  url = config.HOST + "photo";

  readonly page: Page;
  readonly textOnScreenInput: Locator;
  readonly mirrorToggle: Locator;
  readonly takePhotoAndProceedButton: Locator;
  readonly savePhotoButton: Locator;
  readonly photoBoxWindow: Locator;
  readonly limitExceededValidationMessage: Locator;
  readonly fontDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mirrorToggle = page.locator('input[aria-label="Toggle mirror"]');
    this.textOnScreenInput = page.getByLabel('Text on screen', { exact: true })

    this.takePhotoAndProceedButton = page.getByRole('button', { name: 'Take photo & proceed' })
    this.savePhotoButton = page.getByRole('button', { name: 'Save photo' })
    this.photoBoxWindow = page.locator('.position-absolute');
    this.fontDropdown = page.getByRole('combobox').locator('i')
    this.limitExceededValidationMessage = page.getByText('Limit exceeded'), { exact: true };
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async addTextToPhoto(text: string) {
    await this.textOnScreenInput.fill(text);
  }

  async selectFont(fontName: string) {
    await this.fontDropdown.click();
    await this.page.getByText(fontName).click();
  }

}