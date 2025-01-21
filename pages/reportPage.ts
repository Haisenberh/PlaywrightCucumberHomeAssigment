import { Page, type Locator, expect } from './base.ts';
import * as fs from 'fs';

export class ReportPage {
  private readonly downloadPath: string = './tmp';

  readonly page: Page;
  readonly customIncomeCheckBox: Locator;
  readonly customIncomeInput: Locator;
  readonly saveReportButton: Locator;
  readonly taxesToPayCell: Locator;
  readonly totalIncomeCell: Locator;
  readonly revenueCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customIncomeCheckBox = page.getByLabel('Custom income')
    this.customIncomeInput = page.getByLabel('Enter custom income')
    this.saveReportButton = page.getByRole('button', { name: 'Save report' })
    this.taxesToPayCell = page.getByRole('cell', { name: 'Taxes to pay' });
    this.revenueCell = page.getByRole('cell', { name: 'Revenue' });

    // Ensure download directory exists
    if (!fs.existsSync(this.downloadPath)) {
      fs.mkdirSync(this.downloadPath, { recursive: true });
    }
  }

  async goto() {
    await this.page.goto('/report', { waitUntil: 'domcontentloaded' });
  }

  async enterCustomIncome(income: string) {
    await this.customIncomeCheckBox.check();
    await expect(this.customIncomeInput).toBeVisible();
    await this.customIncomeInput.click();
    await this.customIncomeInput.fill(income);
  }
}