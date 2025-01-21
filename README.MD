# Playwright Test Suite for Photo Booth Web Application

This test suite covers basic user flows for the Photoo Booth Web App<br/>The tests are executed on Chromium-based (Google Chrome, Opera, Safari, Edge) and Firefox browsers using the Playwright test framework.

## Prerequisites

1. Node.js (version 20 or higher)
2. NPM (version 10 or higher)
3. Playwright should be installed. If you don't have it, you can use this command:  `npm init playwright@latest`   
4. Photo Booth app should be running

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Configuration of .env file

1. Create a .env file from the provided .env.example template. 
2. Modify the .env file to include your local setup details, such as: HOST_ADDRESS, BASE_URL, API_BASE_URL,DOWNLOAD_FOLDER etc.
3. Ensure that the necessary URLs and file paths are properly set according to your local environment.

## Running tests

Suite contains both API and End To End Ui tests.
To run the whole test suite, execute the following command in your terminal from the project directory:

`npx playwright test`

To run only API tests:
`npx playwright test tests/api`

To run only E2E tests:
`npx playwright test tests/e2e`

Running a single test file:
`npx playwright test tests/e2e/products.spec.ts`

## Review results

By default suite is saving index.html file to playwright-report folder

For more advanced configurations, customizations, or troubleshooting, refer to the [Playwright documentation](https://playwright.dev/docs/intro).
