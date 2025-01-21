import { test, expect } from '../../pages/base.ts'
import { randomBytes } from 'crypto';

test.describe('Photo Booth page tests', () => {
  test('Take photo & proceed functionality works correctly', async ({ photoPage, productPage, context }) => {
    await photoPage.goto();
    // Allow usage of camera
    await context.grantPermissions(['camera']);
    await photoPage.mirrorToggle.check();
    await photoPage.textOnScreenInput.fill('Tester say hi!');
    await photoPage.selectFont('Honk');
    // wait untill photo preview is visible
    await expect(photoPage.photoBoxWindow).toBeVisible();
    await photoPage.takePhotoAndProceedButton.click();
    // Verify save button is visible
    await expect(productPage.cartIsEmptyMessage).toBeVisible();
  });

  test('Positive: Save photo functionality works correctly', async ({ photoPage, context, fileUtils }) => {
    await photoPage.goto();

    // Allow usage of camera
    await context.grantPermissions(['camera']);

    await photoPage.mirrorToggle.check();
    await photoPage.textOnScreenInput.fill('Tester say hi!');

    // Wait until photo preview is visible
    await expect(photoPage.photoBoxWindow).toBeVisible();
    await expect(photoPage.savePhotoButton).toBeVisible();

    // Validate the downloaded report
    const downloadTrigger = async () => await photoPage.savePhotoButton.click();
    await fileUtils.validateDownloadedFile(photoPage.page, downloadTrigger, 'photo.png');

    // cleanup
    await fileUtils.cleanup();
  });

  test('Negative: Screen text validation works correctly', async ({ photoPage, context }) => {
    await photoPage.goto();
    // Allow usage of camera
    await context.grantPermissions(['camera']);
    await photoPage.textOnScreenInput.fill(
      randomBytes(31).toString('base64').slice(0, 31)
    );
    // assert validation message is visible
    await expect(photoPage.limitExceededValidationMessage).toBeVisible();
  });
});