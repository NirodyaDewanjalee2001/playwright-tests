import {test,expect} from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';

const BASE_URL = 'https://www.saucedemo.com';

// The simplest possible accessibility test — scan the whole page
// and fail if ANY violation is found.

test.describe('Basic full-page scan', () => {

    test('login oage has no accessibility violations', async ({page}) => {
        await page.goto(BASE_URL);

        const results = await new AxeBuilder({page}).analyze();

        if(results.violations.length > 0){
            console.log('violations found:');
            results.violations.forEach((v) => {
                console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}`);
                console.log(` Description: ${v.description}`);
                console.log(`  Help: ${v.helpUrl}`);
                v.nodes.forEach((node)=>{
                    console.log(`  Element: ${node.html}`);
                });
            });
        }
        expect(results.violations).toEqual([]);
    });
});


test.describe('Understanding violation reports', () => {

    test('print a full violation report to terminal', async ({page}) => {
        await page.goto(BASE_URL);

        const results = await new AxeBuilder({page}).analyze();

        // The results object has three key arrays:
        console.log('\n===== AXE SCAN RESULTS =====');
        console.log('Passes:     ', results.passes.length);      // rules that passed
        console.log('Violations: ', results.violations.length);  // rules that failed
        console.log('Incomplete: ', results.incomplete.length);  // needs manual check
        console.log('Inapplicable:', results.inapplicable.length); // not relevant to page

        results.violations.forEach((violation, i) => {
            console.log(`\n--- Violation ${i + 1} ---`);
            console.log('Rule ID:    ', violation.id);
            console.log('Impact:     ', violation.impact);
            console.log('Description:', violation.description);
            console.log('Help URL:   ', violation.helpUrl);
            console.log('Affected elements:');

            violation.nodes.forEach((node) => {
                console.log('  HTML:   ', node.html);
                console.log('  Target: ', node.target);
                console.log('  Reason: ', node.failureSummary);
            });
        });

    });
});

// Use .include() to scan just one component or section.

test.describe('Scoped scans', () => {
 
  test('scan only the login form', async ({ page }) => {
    await page.goto(BASE_URL);
 
    // .include() takes a CSS selector — only that element and its children
    // are scanned. Everything else on the page is ignored.
    const results = await new AxeBuilder({ page })
      .include('.login-box')   // scope to the login form container
      .analyze();
 
    console.log('Login form violations:', results.violations.length);
    expect(results.violations).toEqual([]);
  });
 
  test('scan only the page header', async ({ page }) => {
    await page.goto(`${BASE_URL}/inventory.html`);
 
    const results = await new AxeBuilder({ page })
      .include('.primary_header')
      .analyze();
 
    console.log('Header violations:', results.violations.length);
    expect(results.violations).toEqual([]);
  });
 
});

// Excluding elements from the scan. 
// Sometimes a third-party widget or a known issue you can't fix
// should be excluded so it doesn't block your pipeline.

test.describe('Excluding elements', () => {
 
  test('scan page but exclude the footer', async ({ page }) => {
    await page.goto(BASE_URL);
 
    // .exclude() removes matching elements from the scan
    // Useful for: third-party chat widgets, known unfixable issues,
    // embedded iframes you don't control
    const results = await new AxeBuilder({ page })
      .exclude('.footer')
      .analyze();
 
    console.log('Violations (footer excluded):', results.violations.length);
    expect(results.violations).toEqual([]);
  });
 
  test('exclude multiple elements at once', async ({ page }) => {
    await page.goto(BASE_URL);
 
    const results = await new AxeBuilder({ page })
      .exclude('.footer')
      .exclude('#chat-widget')
      .exclude('[data-third-party]')
      .analyze();
 
    expect(results.violations).toEqual([]);
  });
 
});