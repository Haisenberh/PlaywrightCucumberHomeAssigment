import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { test } from '../../pages/base';

Then('I see registration number {string} displayed on the page', async (registrationConfirmationPage, registrationNumber) => {
  await test.step('Verify success message', async () => {
    await expect(registrationConfirmationPage.getRegistrationNumber()).toBe(registrationNumber);
  });
});

Then('I should see registration confirmation success message', async (registrationConfirmationPage) => {
  await test.step('Verify registration number is visible', async () => {
    await expect(registrationConfirmationPage.getSuccessMessage()).toBeVisible();
  });
})