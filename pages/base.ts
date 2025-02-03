import { test as base, expect, Locator, Page } from '@playwright/test';
import { RegistrationPage } from './registrationPage';
import { RegistrationConfirmationPage } from './registrationConfirmationPage';
import { LoginPage } from './loginPage';
import { HomePage } from './homePage';

type CustomFixtures = {
  registrationPage: RegistrationPage;
  registrationConfirmationPage: RegistrationConfirmationPage;
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<CustomFixtures>({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registrationConfirmationPage: async ({ page }, use) => {
    await use(new RegistrationConfirmationPage(page));
  }
});

export { expect, Locator, Page };