/**
 * Playwright API Testing — JSONPlaceholder
 * =========================================
 * Covers: GET · POST · PUT · PATCH · DELETE · Auth headers
 *
 * No browser needed — pure API automation via Playwright's APIRequestContext.
 *
 * Run:   npx playwright test api.spec.ts
 */

import {test,expect} from '@playwright/test';

// Base URL — defined once, reused everywhere

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// ---------------------------------------------------------------------------
// Simulated auth token
// JSONPlaceholder does NOT enforce auth, but we attach the header so you
// learn the exact pattern used in real APIs that do require it.
// ---------------------------------------------------------------------------
const AUTH_TOKEN = 'my-secret-bearer-token';

// ---------------------------------------------------------------------------
// Reusable auth headers — spread these into any request that needs auth
// ---------------------------------------------------------------------------
const authHeaders = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json',
};

// ===========================================================================
// GET REQUESTS
// ===========================================================================
test.describe('GET requests',() => {

    //GET all posts
    test('GET /posts - returns 100 posts', async ({request}) => {
        const response = await request.get(`${BASE_URL}/posts`);

        //Status check
        expect(response.status()).toBe(200);

        //Header check
        expect(response.headers()['content-type']).toContain('application/json');

        //Body check
        const body = await response.json();
        console.log('Total posts fetched:', body.length);

        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(100);

        //Schecma check
        const firstPost = body[0];
        expect(firstPost).toHaveProperty('id');
        expect(firstPost).toHaveProperty('title');
        expect(firstPost).toHaveProperty('body');
        expect(firstPost).toHaveProperty('userId');
    });

    //GET single post by ID
    test('GET /posts/1 - returns correct post', async ({request}) => {
        const response = await request.get(`${BASE_URL}/posts/1`);

        expect(response.status()).toBe(200);

        const post = await response.json();
        console.log('Fetched post:', post);
 
        expect(post.id).toBe(1);
        expect(post.userId).toBe(1);
        expect(typeof post.title).toBe('string');
        expect(post.title.length).toBeGreaterThan(0);
    });


    // GET with query params — filter posts by userId  
    test('GET /posts?userId=1 — returns only posts for user 1', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/posts`, {
        params: { userId: 1 },  // Playwright adds ?userId=1 to the URL automatically
        });
 
        expect(response.status()).toBe(200);
 
        const posts = await response.json();
        console.log('Posts for userId=1:', posts.length);
 
        // Every returned post must belong to userId 1
        posts.forEach((post: any) => {
        expect(post.userId).toBe(1);
        });
    });

    // GET a non-existent resource — expect 404
    test('GET /posts/9999 — returns 404 for missing resource', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/posts/9999`);

        expect(response.status()).toBe(404);
        console.log('404 confirmed for missing post');
    });

    

})
