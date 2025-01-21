import { test, expect } from '../../pages/base.ts';
import { config } from '../../config/index.ts';

test.describe('API Tests for POST /order endpoint', () => {

  const baseUrl = config.API;

  test('Positive: POST /order API test', async ({ request }) => {
    // Request payload
    const orderPayload = [
      {
        "id": "6x12",
        "price": 700,
        "free": true
      },
      {
        "id": "2x6",
        "price": 500,
        "free": true
      },
      {
        "id": "4x6",
        "price": 500
      }
    ];

    // Perform the POST request to /order
    const response = await request.post(`${baseUrl}/order`, {
      data: orderPayload, // Send payload in the request body
    });

    // Assert response status
    expect(response.status()).toBe(200);

    // Parse and validate the JSON response
    const responseBody = await response.json();

    // Assertions for response body
    expect(responseBody).toHaveProperty('success');
    expect(responseBody.success).toBe(true);
  });
});
