import {test,expect, request} from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const AUTH_TOKEN = 'my-secret-bearer-token';

const authHeaders = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json',
};

// DELETE REQUESTS
test.describe('DELETE requests', () => {
 
  // Delete a post
  
  test('DELETE /posts/1 — deletes a post and returns 200', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`, {
      headers: authHeaders,
    });
 
    // JSONPlaceholder returns 200 with an empty object {}
    expect(response.status()).toBe(200);
 
    const result = await response.json();
    console.log('DELETE result:', result);
 
    // Body should be empty after delete
    expect(result).toEqual({});
  });
 
});