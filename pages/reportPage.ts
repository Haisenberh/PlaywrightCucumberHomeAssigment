import { Page, type Locator, expect } from './base.ts';
import * as fs from 'fs';

export class ReportPage {
  private readonly downloadPath: string = './tmp';

  readonly page: Page;
  readonly customIncomeCheckBox: Locator;
  readonly customIncomeInput: Locator;
  readonly saveReportButton: Locator;
  readonly taxesToPayCell: Locator;
  readonly revenueCell: Locator;
  readonly totalIncomeCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customIncomeCheckBox = page.getByLabel('Custom income')
    this.customIncomeInput = page.getByLabel('Enter custom income')
    this.saveReportButton = page.getByRole('button', { name: 'Save report' })
    this.taxesToPayCell = page.getByRole('cell', { name: 'Taxes to pay' });
    this.revenueCell = page.getByRole('cell', { name: 'Revenue' });
    this.totalIncomeCell = page.getByRole('cell', { name: 'Total income' });

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

  // Method to calculate and get the expected tax from the custom income
  getExpectedTax(customIncome: string): number {
    const tax = 8.625;
    return parseFloat((parseFloat(customIncome) * tax / 100).toFixed(2));
  }

  // Method to calculate and get the expected revenue
  getExpectedRevenue(customIncome: string): number {
    const expectedTax = this.getExpectedTax(customIncome);
    return parseFloat(customIncome) - expectedTax;
  }

  // Method to verify the tax is correctly displayed
  async verifyTax(customIncome: string) {
    const expectedTax = this.getExpectedTax(customIncome);
    await expect(this.page.getByRole('cell', { name: `$${expectedTax.toFixed(2)}` })).toBeVisible();
  }

  // Method to verify the revenue is correctly displayed
  async verifyRevenue(customIncome: string) {
    const expectedRevenue = this.getExpectedRevenue(customIncome);
    await expect(this.page.getByRole('cell', { name: `$${expectedRevenue.toFixed(2)}` })).toBeVisible();
  }

  async verifySaveReportButton() {
    await expect(this.saveReportButton).toBeVisible();
  }
}
