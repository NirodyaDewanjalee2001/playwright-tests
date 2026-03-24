import {test,expect, request} from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const AUTH_TOKEN = 'my-secret-bearer-token';

const authHeaders = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json',
};

// PUT & PATCH REQUESTS

test.describe('PUT and PATCH requests', () => {
 
  // PUT — full update (replaces the entire resource)

  test('PUT /posts/1 — fully updates a post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated title',
      body: 'Updated body content',
      userId: 1,
    };
 
    const response = await request.put(`${BASE_URL}/posts/1`, {
      headers: authHeaders,
      data: updatedPost,
    });
 
    expect(response.status()).toBe(200);
 
    const result = await response.json();
    console.log('PUT result:', result);
 
    expect(result.title).toBe('Updated title');
    expect(result.body).toBe('Updated body content');
  });
  

  // PATCH — partial update (only send the fields you want to change)

  test('PATCH /posts/1 — partially updates a post title', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/posts/1`, {
      headers: authHeaders,
      data: { title: 'Patched title only' },  // only changing title
    });
 
    expect(response.status()).toBe(200);
 
    const result = await response.json();
    console.log('PATCH result:', result);
 
    expect(result.title).toBe('Patched title only');
    // Other fields like body and userId are still present
    expect(result.body).toBeDefined();
  });

});