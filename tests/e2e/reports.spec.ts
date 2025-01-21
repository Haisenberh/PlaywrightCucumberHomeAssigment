import { test, expect } from '../../pages/base.ts';

test.describe('Reports page tests', () => {
  test('Positive: Reports page UI', async ({ reportPage }) => {
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

    // Step 5: Validate the downloaded report (optional)
    await reportPage.validateDownloadedFile('report.csv');

    // Cleanup (if necessary, based on your environment)
    await reportPage.cleanup();
  });
});