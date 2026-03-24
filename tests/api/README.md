
 * QUICK REFERENCE

 * Making requests:
 *   request.get(url, { headers?, params? })
 *   request.post(url, { headers?, data? })
 *   request.put(url, { headers?, data? })
 *   request.patch(url, { headers?, data? })
 *   request.delete(url, { headers? })

 * Common assertions:
 *   expect(response.status()).toBe(200)
 *   expect(response.ok()).toBeTruthy()          // true for 2xx
 *   expect(response.headers()['content-type']).toContain('application/json')
 *   const body = await response.json()
 *   expect(body.id).toBeDefined()
 *   expect(body.title).toBe('expected value')

 * Auth patterns:
 *   Bearer token  →  headers: { Authorization: `Bearer ${token}` }
 *   API key       →  headers: { 'x-api-key': apiKey }
 *   Basic auth    →  headers: { Authorization: `Basic ${btoa('user:pass')}` }
 