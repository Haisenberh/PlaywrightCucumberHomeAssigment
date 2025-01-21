import { Page, type Locator, expect } from './base.ts';
import * as fs from 'fs';
import * as path from 'path';

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

  async downloadFile(): Promise<string> {
    // Create a promise for the download event before clicking
    const downloadPromise = this.page.waitForEvent('download', { timeout: 10000 });
    
    // Click the save button
    await this.saveReportButton.click();
    
    try {
      // Wait for the download to start
      const download = await downloadPromise;
      
      // Get the suggested filename
      const suggestedFilename = download.suggestedFilename();
      const filePath = path.join(this.downloadPath, suggestedFilename);
      
      // Wait for the download to complete and save the file
      await download.saveAs(filePath);
      
      // Verify the file exists and has content
      await this.verifyFileExists(filePath);
      
      return suggestedFilename;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  private async verifyFileExists(filePath: string): Promise<void> {
    // Wait for the file to exist with retry
    let retries = 5;
    while (retries > 0) {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 0) {
          return;
        }
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      retries--;
    }
    throw new Error(`File not found or empty: ${filePath}`);
  }
async validateDownloadedFile(expectedFileName: string): Promise<void> {
    const actualFileName = await this.downloadFile();
    expect(actualFileName).toBe(expectedFileName);
    
    const filePath = path.join(this.downloadPath, actualFileName);
    
    // Validate that file exists and not empty
    expect(fs.existsSync(filePath)).toBe(true);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    expect(fileContent.length).toBeGreaterThan(0);
  }

  async cleanup(): Promise<void> {
    // Clean up downloaded files after test
    if (fs.existsSync(this.downloadPath)) {
      fs.readdirSync(this.downloadPath).forEach(file => {
        fs.unlinkSync(path.join(this.downloadPath, file));
      });
    }
  }
}