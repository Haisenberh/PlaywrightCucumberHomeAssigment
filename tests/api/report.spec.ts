import { test, expect } from '../../pages/base.ts'
import { config } from '../../config/index.ts';

test.describe('API Tests for GET revenue /report endpoint', () => {

  const baseUrl = config.API;
  test('Positive: GET /revenue API test', async ({ request }) => {

    // Perform the GET request to /report with params
    const response = await request.get(`${baseUrl}/report?month=0&year=2025`);

    // Assert response status
    expect(response.status()).toBe(200);

    // Parse and validate the JSON response
    const responseBody = await response.json();

    // Assertions for response body
    expect(typeof responseBody).toBe('object'); // Ensure it's an object

    // Expected schema and it's validation rules
    const expectedSchema = {
      ordersMade: (value: any) => typeof value === 'number' && value > 0,
      printsDone: (value: any) => typeof value === 'number' && value > 0,
      printsWon: (value: any) => typeof value === 'number' && value > 0,
      totalIncome: (value: any) => typeof value === 'number' && value > 0,
      totalGifted: (value: any) => typeof value === 'number' && value > 0,
      taxesToPay: (value: any) => typeof value === 'number' && value > 0,
    };

    // Validate each field in the response object
    Object.entries(expectedSchema).forEach(([key, validator]) => {
      expect(responseBody).toHaveProperty(key); // Ensure the field exists
      expect(validator(responseBody[key])).toBe(true); // Validate the field's value
    });
  });
});