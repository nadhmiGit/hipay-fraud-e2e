# Playwright BDD Testing Template

A clean, well-organized Playwright BDD testing template using **Gherkin/Cucumber** syntax with **playwright-bdd**, TypeScript support, and Page Object Model pattern for behavior-driven end-to-end testing.

## 📁 Project Structure

```
playwright-bdd-template/
├── features/                       # Gherkin feature files
│   ├── authentication/            # Authentication features
│   │   ├── login.feature          # Login scenarios
│   │   └── logout.feature         # Logout scenarios
│   └── examples/                  # Example features
│       └── search.feature         # Search functionality
│
├── steps/                          # Step definitions
│   ├── authentication/            # Auth-related steps
│   │   ├── login.step.ts          # Login step definitions
│   │   ├── logout.step.ts         # Logout step definitions
│   │   └── fixtures.ts            # Auth fixtures
│   └── common/                    # Reusable steps
│       └── common.step.ts         # Common step definitions
│
├── pages/                          # Page Object Model
│   ├── base.page.ts               # Base page class
│   ├── login.page.ts              # Login page object
│   ├── dashboard.page.ts          # Dashboard page object
│   └── index.ts                   # Page objects export
│
├── utils/                          # Utility functions
│   ├── wait.utils.ts              # Wait helpers
│   ├── string.utils.ts            # String utilities
│   ├── date.utils.ts              # Date utilities
│   └── index.ts                   # Utils export
│
├── test-data/                      # Test data
│   └── test-data.ts               # Static test data
│
├── fixtures.setup.ts               # Main BDD fixtures setup
├── playwright.config.ts            # Playwright configuration with BDD
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## 🎯 What is Playwright-BDD?

This template uses **[playwright-bdd](https://github.com/vitalets/playwright-bdd)** which enables:

- ✅ Write tests in **Gherkin** (Given/When/Then) syntax
- ✅ Use **.feature** files for scenarios
- ✅ Cucumber-style BDD with Playwright's power
- ✅ Generate test files automatically from features
- ✅ Full TypeScript support
- ✅ Cucumber JSON reports compatible with Allure

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Setup environment
cp .env.example .env

# Generate tests from features
npm run gen:tests

# Run tests
npm test

# Run in UI mode (with watch)
npm run test:ui
```

## 🧪 Running Tests

### Generate test files (required first!)
```bash
npm run gen:tests
```

### Run all tests
```bash
npm test                    # Headless
npm run test:headed         # With browser UI
npm run test:ui             # Interactive UI mode + watch
```

### Run by tags
```bash
npm run test:smoke          # @smoke tests
npm run test:regression     # @regression tests
npx playwright test --grep @authentication
```

### View reports
```bash
npm run report              # Playwright HTML report
npm run report:cucumber     # Allure report
```

## 📝 Writing BDD Tests

### 1. Create Feature File

```gherkin
# features/user-profile.feature
Feature: User Profile

  @smoke
  Scenario: View profile
    Given I am logged in as "test@example.com"
    When I navigate to my profile
    Then I should see my email

  Scenario Outline: Update name
    When I update my name to "<name>"
    Then my name should be "<name>"

    Examples:
      | name       |
      | John Doe   |
      | Jane Smith |
```

### 2. Create Step Definitions

```typescript
// steps/profile/profile.step.ts
import { Given, When, Then } from '../authentication/fixtures';
import { expect } from '@playwright/test';

When('I navigate to my profile', async ({ page }) => {
  await page.goto('/profile');
});

Then('I should see my email', async ({ page }) => {
  await expect(page.getByTestId('user-email')).toBeVisible();
});
```

### 3. Run Tests

```bash
npm run gen:tests && npm test
```

## 🏷️ Tags

Organize tests with tags:

```gherkin
@smoke @authentication
Scenario: Login

@wip
Scenario: Work in progress
```

Run tagged tests:
```bash
npm run test:smoke
npx playwright test --grep @authentication
npx playwright test --grep-invert @wip  # Exclude @wip
```

## 📦 Page Objects with BDD

```typescript
// pages/profile.page.ts
export class ProfilePage extends BasePage {
  readonly nameInput: Locator;
  
  constructor(page: Page) {
    super(page, '/profile');
    this.nameInput = page.getByLabel('Name');
  }
  
  async updateName(name: string) {
    await this.nameInput.fill(name);
  }
}

// In step definition:
When('I update my name to {string}', async ({ page }, name) => {
  const profilePage = new ProfilePage(page);
  await profilePage.updateName(name);
});
```

## 🎨 Best Practices

### Feature Files
✅ Write from user perspective
✅ One behavior per scenario
✅ Use Background for common setup
✅ Use Scenario Outline for data-driven tests
✅ Tag appropriately (@smoke, @regression)

### Step Definitions
✅ Keep steps simple and reusable
✅ Use Page Objects for UI interactions
✅ Make steps declarative, not imperative
✅ Share common steps across features

### Example: Good vs Bad

**Good (Declarative):**
```gherkin
Given I am logged in
When I create an order
Then the order should be created
```

**Bad (Imperative):**
```gherkin
Given I click the login button
And I enter "user@test.com" in field "email"
And I click submit
```

## 🔍 Debugging

```bash
npm run test:debug              # Debug mode
npm run test:headed             # See browser
npm run test:ui                 # Interactive UI (best!)
npx playwright test --debug     # Playwright Inspector
```

## 📊 Reports

- **Playwright HTML**: Auto-generated, view with `npm run report`
- **Cucumber JSON**: `cucumber-report/report.json`
- **JUnit XML**: `test-results/junit.xml`
- **Allure**: Run `npm run report:cucumber`

## 🌍 Environment Variables

```.env
BASE_URL=http://localhost:3000
TEST_USERNAME=test@example.com
TEST_PASSWORD=SecurePassword123
WORKERS=4
RETRIES=2
```

## 📚 Workflow

1. Write `.feature` file with scenarios
2. Run `npm run gen:tests` to generate test files
3. Create step definitions (`.step.ts` files)
4. Implement Page Objects as needed
5. Run tests: `npm test`
6. Review reports

## 🚨 Common Issues

**Tests not found?**
→ Run `npm run gen:tests` after editing .feature files

**Step definition not found?**
→ Check step text matches exactly
→ Ensure step file is in `steps/` directory
→ Re-run `npm run gen:tests`

**TypeScript errors in .features-gen/?**
→ Don't edit generated files!
→ Edit source `.feature` files instead

## 💡 Tips

- Use `npm run test:ui` during development (live reload!)
- Tag WIP with `@wip` and exclude: `--grep-invert @wip`
- Combine BDD with Page Objects for maintainability
- Keep step definitions reusable
- Use Scenario Outline for data-driven tests

## 📖 Resources

- [Playwright-BDD Docs](https://github.com/vitalets/playwright-bdd)
- [Playwright Docs](https://playwright.dev)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Cucumber Best Practices](https://cucumber.io/docs/bdd/)

---

**Happy BDD Testing! 🥒🎭**
