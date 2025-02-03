import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { test } from '../../pages/base';
import { readUserCsv } from '../../utils/csvReader';

Given('I am on the login page', async (loginPage) => {
  await test.step('Navigate to login page', async () => {
    await loginPage.goto();
  });
});

When('I login using credentials <email> and <password>', async (loginPage, email, password) => {
  await test.step('Login with credentials', async () => {
    await loginPage.login(email, password);
  });
});

Then('I should see a Registration Number <registrationNumber> displayed on the page', async (loginPage, registrationNumber) => {
  await test.step('Verify Registration Number', async () => {
    await expect(loginPage.getRegistrationNumber()).toBe(registrationNumber);
  });
});

When('I login using CSV data from file <file>', async (loginPage, file) => {
  await test.step('Login using CSV data', async () => {
    let testData = await readUserCsv(file);
    // use latest row to login
    await loginPage.login(testData[0].email, testData[0].password);
  });
});