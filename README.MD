# Playwright + Cucumber Test Suite for DSV

This test suite covers basic user flows for the DSV
<br/>The tests are executed on Chromium-based (Google Chrome, Opera, Safari, Edge) and Firefox browsers using the Playwright test framework.

## Prerequisites

1. Node.js (version 20 or higher)
2. NPM (version 10 or higher)
3. Playwright should be installed. If you don't have it, you can use this command:  
```
npm init playwright@latest
```   
4. Cucumber should be installed.

## Installation

1. Navigate to the project directory in your terminal.
2. Run ```npm install``` to install the required dependencies.

## Configuration of .env file

1. Create a .env file from the provided .env.example template. 
2. Modify the .env file to include your local setup details, such as: HOST_ADDRESS, BASE_URL, API_BASE_URL,SHARED_FOLDER and TEST_DATA_FOLDER etc.
3. Ensure that the necessary URLs and file paths are properly set according to your local environment.

## Running tests

Suite contains End To End Ui tests located at `./tests/features/*.feature`.

Step Definitions are located at `./tests/step-definitions/*.ts`.

To run the whole test suite, execute the following command in your terminal from the project directory:

```
npx cucumber-js
```

## Review results

By default suite is saving index.html file to playwright-report folder. You can save report in any suitable format, just pass needed type of file as a [argument](https://playwright.dev/docs/test-reporters)

For more advanced configurations, customizations, or troubleshooting, refer to the [Playwright documentation](https://playwright.dev/docs/intro).
