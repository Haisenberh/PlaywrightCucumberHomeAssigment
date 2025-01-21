import { test, expect } from '../../pages/base.ts'
import { config } from './../../config/index.ts';

test.describe('API Tests for /products endpoint', () => {
  // Define the base URL for the API
  const baseUrl = config.API;
  test('Positive: GET /products API test', async ({ request }) => {

    // Perform the GET request to /products
    const response = await request.get(`${baseUrl}/products`);

    // Assert response status
    expect(response.status()).toBe(200);

    // Parse and validate the JSON response
    const responseBody = await response.json();

    // Assertions for response body
    expect(Array.isArray(responseBody)).toBe(true); // Ensure it's an array
    expect(responseBody.length).toBeGreaterThan(0); // Ensure there are products

    // Expected fields and their Bussiness logic validation rules
    const expectedFields = {
      id: (value: any) => typeof value === 'string',
      price: (value: any) => typeof value === 'number' && value === 500 || value === 700,
      width: (value: any) => typeof value === 'number' && value > 0 && value < 13,
      height: (value: any) => typeof value === 'number' && value === 6,
    };

    // Additional rules for the package "2x6"
    const extraFieldsFor2x6 = {
      photosPerItem: (value: any) => typeof value === 'number' && value === 3,
      minAmount: (value: any) => typeof value === 'number' && value === 2,
    };

    // Validate each product
    responseBody.forEach((product: any) => {
      Object.entries(expectedFields).forEach(([key, validator]) => {
        expect(product).toHaveProperty(key); // Ensure the field exists
        expect(validator(product[key])).toBe(true); // Validate the field's value
      });
      // Additional validation for the packaged "2x6"
      if (product.id === '2x6') {
        Object.entries(extraFieldsFor2x6).forEach(([key, validator]) => {
          expect(product).toHaveProperty(key); 
          expect(validator(product[key])).toBeTruthy();
        });
      }
    });


  });
});
