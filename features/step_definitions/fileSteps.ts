import { Given, When, Then } from '@cucumber/cucumber';
import { test } from '../../pages/base';
import { readUserCsv } from '../../utils/csvReader';

When('I save user registration number to file', async (saveRegistrationNumberToCsv, registrationConfirmationPage) => {
  await test.step('I save user registration number to <file>', async () => {
    await saveRegistrationNumberToCsv(registrationConfirmationPage.getRegistrationNumber());
  });
});

When('I read registration number from file <file>', async (file: string) => {
  await test.step('I read registration number from <file>', async () => {
    await readUserCsv(file);
  });
})