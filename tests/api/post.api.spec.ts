import {test,expect, request} from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const AUTH_TOKEN = 'my-secret-bearer-token';

const authHeaders = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json',
};

// ===========================================================================
// POST REQUESTS
// ===========================================================================

test.describe('POST requests',() => {

    test('POST /posts - create a new post', async ({request})=> {
        const newPost = {
            title: 'My test post',
            body: 'This is the body of my test post',
            userId: 1,
        };  

        const response = await request.post(`${BASE_URL}/posts`, {
            headers: authHeaders,
            data: newPost,
        });

        expect(response.status()).toBe(201);

        const createdPost = await response.json();
        console.log('Created Post:',createdPost);

        expect(createdPost.id).toBeDefined();
        expect(createdPost.title).toBe(newPost.title);
        expect(createdPost.body).toBe(newPost.body);
        expect(createdPost.userId).toBe(newPost.userId);
    });

})