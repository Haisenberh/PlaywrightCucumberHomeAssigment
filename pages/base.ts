import { test as base, expect, Locator, Page } from '@playwright/test';
import { PhotoBoothPage } from './photoPage';
import { ProductPage } from './productPage';
import { ReportPage } from './reportPage';
import { FileUtils } from '../utils/fileUtils';

type CustomFixtures = {
  photoPage: PhotoBoothPage;
  productPage: ProductPage;
  reportPage: ReportPage;
  fileUtils: FileUtils;
};

export const test = base.extend<CustomFixtures>({
  fileUtils: async ({ }, use) => {
    const fileUtils = new FileUtils();
    await use(fileUtils);
    await fileUtils.cleanupDownloads(); // Cleanup after each test
  },
  photoPage: async ({ page }, use) => {
    await use(new PhotoBoothPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  reportPage: async ({ page }, use) => {
    await use(new ReportPage(page));
  }
});

export { expect, Locator, Page };