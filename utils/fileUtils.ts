import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';

export class FileUtils {
  private readonly downloadPath: string = './tmp';

  constructor() {
    if (!fs.existsSync(this.downloadPath)) {
      fs.mkdirSync(this.downloadPath, { recursive: true });
    }
  }

  async downloadFile(page: Page, downloadTrigger: () => Promise<void>, options = { timeout: 10000 }): Promise<string> {
    // Create download promise before triggering the download
    const downloadPromise = page.waitForEvent('download', { timeout: options.timeout });

    try {
      // Trigger the download using the provided function (e.g. clicking a Save button)
      await downloadTrigger();

      const download = await downloadPromise;
      const suggestedFilename = download.suggestedFilename();
      const filePath = path.join(this.downloadPath, suggestedFilename);

      // Wait for the download to complete and save it
      await download.saveAs(filePath);

      await this.verifyFileExists(filePath);

      return suggestedFilename;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  private async verifyFileExists(filePath: string): Promise<void> {
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

  async validateDownloadedFile(page: Page, downloadTrigger: () => Promise<void>, expectedFileName: string): Promise<void> {
    const actualFileName = await this.downloadFile(page, downloadTrigger);

    if (actualFileName !== expectedFileName) {
      throw new Error(`Expected file name to be ${expectedFileName}, but got ${actualFileName}`);
    }

    const filePath = path.join(this.downloadPath, actualFileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist at path: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent.length <= 0) {
      throw new Error(`File is empty: ${filePath}`);
    }
  }

  async cleanup(): Promise<void> {
    if (fs.existsSync(this.downloadPath)) {
      fs.readdirSync(this.downloadPath).forEach(file => {
        fs.unlinkSync(path.join(this.downloadPath, file));
      });
    }
  }
}