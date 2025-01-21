import { test, expect } from '../../pages/base.ts';

test.describe('Reports page tests', () => {
  test('Positive: should calculate tax & revenue and download', async ({ reportPage, fileUtils }) => {
    const customIncome = '1000';
    const totalIncome = customIncome;

    // Go to the reports page
    await reportPage.goto();

    // Enter the custom income
    await reportPage.enterCustomIncome(customIncome);

    // Verify that the Taxes to pay is calculated correctly
    await reportPage.verifyTax(customIncome);

    // Verify that the Revenue is calculated correctly
    await reportPage.verifyRevenue(customIncome);

    // Verify that the save report button is visible
    await reportPage.verifySaveReportButton();

    // Validate the downloaded report
    const downloadTrigger = async () => await reportPage.saveReportButton.click();
    await fileUtils.validateDownloadedFile(reportPage.page, downloadTrigger, 'report.csv');

    // Cleanup
    await fileUtils.cleanup();
  });
});
