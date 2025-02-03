import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { test } from '../../pages/base';
import { readRegistrationNumber } from '../../utils/csvReader';

Then('Registration Number on home page conform user one', async (homePage, file) => {
  await test.step('Verify error message', async () => {
    await expect(homePage.registrationNumber).toBeVisible();
    let registrationNumberOnPage = await homePage.getRegistrationNumber();
    let registrationNumberOnFile = await readRegistrationNumber(file);
    expect(registrationNumberOnPage).toBe(registrationNumberOnFile);
  });
});

Then('I should see a Registration Number displayed on the page', async (homePage) => {
  await test.step('Verify Registration Number', async () => {
    let registrationNumber = await homePage.getRegistrationNumber();
    await expect(registrationNumber).toBeVisible();
  });
});