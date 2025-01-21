import { test, expect } from '../../pages/base.ts'

test.describe('Products page tests', () => {
  test('Positive: Order page validations', async ({ productPage }) => {
    await productPage.goto();
    await expect(productPage.cartIsEmptyMessage).toBeVisible();
    await expect(productPage.payButton).toBeHidden();
    await expect(productPage.clearCartButton).toBeHidden();
    await productPage.fourBySixPackageSelector.click();
    // validate Total price for 4*6 package photo
    await expect(productPage.payButton).toBeVisible();
    await expect(productPage.clearCartButton).toBeVisible();
    await expect(productPage.orderTotalLabel).toHaveText('Total: $5.00');
  });

  test('Positive: Payment works correctly', async ({ productPage }) => {
    await productPage.goto();
    await expect(productPage.cartIsEmptyMessage).toBeVisible();
    await expect(productPage.payButton).toBeHidden();
    await expect(productPage.clearCartButton).toBeHidden();
    await productPage.fourBySixPackageSelector.click();
    // validate payment
    await expect(productPage.payButton).toBeVisible();
    await productPage.payButton.click();
    await expect(productPage.paymentSuccessMessage).toBeVisible();
  });
});