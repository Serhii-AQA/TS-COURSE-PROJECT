# Playwright Test Automation Project

A brief description of the project, which includes information about the purpose of the project, its goals, and how it
utilizes Playwright and TypeScript.

## Introduction

Playwright automation testing project.

## Technology Stack

- **Playwright**: https://playwright.dev/docs/intro
- **TypeScript**: https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html
- **Node.js**: Runtime environment for the test scripts.

## Installation

Clone the repo

```NODEJS
https://github.com/Serhii-AQA/JS-COURSE-PROJECT.git
```

Install dependencies:

```NODEJS
npm run pw:update
```

or if get some issues, you can try

```NODEJS
npx playwright install-deps
```

#Fill in the necessary credentials and tokens

### Usage

I'll create a markdown table with these scripts:

| Script Command                         | Description                                         |
|----------------------------------------|-----------------------------------------------------|
| `npm run test`                         | Run all tests                                       |
| `npm run test headed`                  | Run tests in headed mode                            |
| `npx playwright test --project webkit` | Run tests on different browsers                     |
| `npx playwright test --ui`             | Running the Example Test in UI Mode                 |
| `npx playwright show-report`           | HTML Report: generated automatically after test run |
| `npx playwright codegen`               | Open code generation tool                           |
| `npx playwright test --debug`          | Run in debug mode                                   |

[More Playwright CLI Commands](https://playwright.dev/docs/test-cli)

#### Test Naming Convention

- UI tests: *.spec.ts
- API tests: *.api.spec.ts

### Configuration

- Configuration is handled via playwright.config.ts. You can modify:
- Test timeout
- Base URL
- Browsers (Chromium, Firefox, WebKit)
- Parallelism
- Reporter types

### Test template

```JS
import { test, expect } from '@playwright/test';

test.describe('{{ suite }}', () => {

	test.beforeEach(async ({ api }) => {
		// Setup actions before each test
		// For example: reset state, prepare test environment
	});

	test.afterEach(async ({ api }) => {
		// Cleanup actions after each test
		// For example: logout, clear data
	});

    test('Homepage loads successfully', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toHaveText('Welcome');
    });
});

```

### Best Practices

- Keep tests atomic and independent.
- Use custom fixtures for setup/teardown.
- Use locators based on role, test id, or text — avoid deep CSS selectors.
- Use .only and .skip carefully to avoid skipping critical tests in CI.


