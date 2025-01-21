import { test, expect } from '../../pages/base.ts';

test.describe('Reports page tests', () => {
  test('Positive: Reports page UI', async ({ reportPage, fileUtils }) => {
    let customIncome = '1000';
    let totalIncome = customIncome;
    await reportPage.goto();
    await reportPage.enterCustomIncome(customIncome);
  
    await expect(reportPage.saveReportButton).toBeVisible();

    // Verify that the Taxes to pay is calculated correctly (8.625% of the custom income)
    const expectedTax = parseFloat((parseFloat(customIncome) * 8.625 / 100).toFixed(2));
    await expect(reportPage.page.getByRole('cell', { name: `$${expectedTax.toFixed(2)}` })).toBeVisible();

    const expectedRevenue = parseFloat(totalIncome) - expectedTax;
    await expect(reportPage.page.getByRole('cell', { name: `$${expectedRevenue.toFixed(2)}` })).toBeVisible();
    await expect(reportPage.saveReportButton).toBeVisible();

    // Validate the downloaded report
    const downloadTrigger = async () => await reportPage.saveReportButton.click();
    await fileUtils.validateDownloadedFile(reportPage.page, downloadTrigger, 'report.csv');

    // cleanup
    await fileUtils.cleanup();
  });
});