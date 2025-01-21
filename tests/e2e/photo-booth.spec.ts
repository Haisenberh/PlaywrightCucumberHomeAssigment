import { test, expect } from '../../pages/base.ts'

test.describe('Photo Booth page tests', () => {
  test('Take photo & proceed functionality works correctly', async ({ photoPage, productPage, context }) => {
    await photoPage.goto();
    // Allow usage of camera
    await context.grantPermissions(['camera']);
    await photoPage.mirrorToggle.check();
    await photoPage.textOnScreenInput.fill('Tester say hi!');
    // wait untill photo preview is visible
    await expect(photoPage.photoBoxWindow).toBeVisible();
    await photoPage.takePhotoAndProceedButton.click();
    // Verify save button is visible
    await expect(productPage.cartIsEmptyMessage).toBeVisible();
  });

  test('Positive: Save photo functionality works correctly', async ({ photoPage, context, fileUtils}) => {
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
      Array(31).fill(0).map(() => String.fromCharCode(31 + Math.random() * 94)).join('')
    );
    // assert validation message is visible
    await expect(photoPage.limitExceededValidationMessage).toBeVisible();
  });
});