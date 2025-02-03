import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { test } from '../../pages/base';
import { readUserCsv } from '../../utils/csvReader';

Given('I am on the registration page', async (registrationPage) => {
  await test.step('Navigate to registration', async () => {
    await registrationPage.goto();
  });
});

When('I register user using CSV data from file <file>', async (registrationPage, file) => {
  await test.step('Fill registration form', async () => {
    let testData = await readUserCsv(file);
    await registrationPage.registerNewUser(testData[0].email, testData[0].password, testData[0].username);
  });
});

Then('I should see a success message', async (registrationPage) => {
  await test.step('Verify success message', async () => {
    await expect(registrationPage.successMessage).toBeVisible();
  });
});

Then('I should see an error message with text {string}', async (registrationPage, errorMessage) => {
  await test.step('Verify error message', async () => {
    await expect(registrationPage.errorMessage).toBeVisible();
    await expect(registrationPage.errorMessage).toHaveText(errorMessage);
  });
});