import * as fs from 'fs';
import { config } from './../config/index.ts';

export class FileUtils {
  constructor(private downloadPath = config.DOWNLOAD_FOLDER) {
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
  }

  getFileCount(): number {
    return fs.existsSync(this.downloadPath) ? 
      fs.readdirSync(this.downloadPath).length : 0;
  }

  async waitForNewFile(initialCount: number, timeout = 5000): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (this.getFileCount() > initialCount) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('No new file appeared in download directory');
  }

  async cleanupDownloads(): Promise<void> {  // Changed back to cleanupDownloads
    if (fs.existsSync(this.downloadPath)) {
      fs.readdirSync(this.downloadPath).forEach(file => 
        fs.unlinkSync(`${this.downloadPath}/${file}`));
    }
  }
}