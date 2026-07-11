# Automated Testing & CI Infrastructure Guide

This document outlines the testing architecture, simulation strategy, test suites, and Continuous Integration setup for the TapToGencom generator platform.

---

## 1. Testing Architecture & Directory Structure

All test infrastructure is located under the root `tests/` directory:

```text
tests/
├── datasets/
│   └── datasets.test.cjs        # Verifies generator-datasets.ts integrity and mappings
├── generators/
│   └── runtime.test.cjs         # Simulates execution for all 430 generators
├── helpers/
│   ├── assert.cjs               # Standard light-weight assertion library
│   ├── runner.cjs               # Test suite coordinator and colorful output formatter
│   └── ts-loader.cjs            # Sequential CJS TypeScript compiler and simulation harness
├── integration/
│   └── integration.test.cjs     # Exercises category representative tool integrations
├── inventory/
│   └── inventory.test.cjs       # Validates consistency of master_inventory.json
├── smoke/
│   └── smoke.test.cjs           # Basic configuration and repository layout verification
├── run-all.cjs                  # Coordinates execution of all test suites
├── run-unit.cjs                 # Exclusively runs unit and config tests
├── run-integration.cjs          # Exclusively runs representative integrations
├── run-inventory.cjs            # Exclusively runs inventory integrity checks
├── run-options.cjs              # Exclusively runs option coverage checks
└── run-verify.cjs               # CI verification orchestrator
```

---

## 2. Server-side DOM Simulation & Scope Isolation

Since all generators are designed to run in a browser environment (directly interacting with the DOM elements via IDs, query selectors, styles, and class lists), standard server-side Node execution would fail.

To overcome this, a custom, fast virtual-DOM harness was implemented in `tests/helpers/ts-loader.cjs`:
- **Mock DOM elements**: Custom classes mock element properties like `.classList`, `.style`, `.value`, `.checked`, and methods like `.addEventListener()` and `.cloneNode()`.
- **Dynamic global context**: Mocks for `globalThis.document`, `globalThis.window`, and `globalThis.navigator` are injected at runtime.
- **Module and Scope resolution**: Since `generator-datasets.ts` and `tool-workspace.ts` are separate scripts, we compile and bundle them dynamically using `esbuild`. 
- **Global Hoisting**: In order to make local functions and helper definitions visible across module boundaries (as they naturally are in the browser), helper functions like `compactSeed`, `slugWords`, and `titleCase` are exposed to the `globalThis` scope within the compiled scope at evaluation time.

---

## 3. Test Suites

### Generator Runtime Tests (`tests/generators/runtime.test.cjs`)
Verifies that every single one of the 430 generators declared in `src/data/tools.ts`:
- Has a matching runtime execution case.
- Executes to completion without throwing any exceptions.
- Produces valid, non-empty HTML/text outputs.
- Does not fallback to default "coming soon" placeholders.

### Option Coverage Tests (`tests/options/options.test.cjs`)
Verifies the integrity and wiring of generator options:
- Asserts no duplicate option IDs are declared within the same generator.
- Validates number defaults are within min/max boundaries.
- Validates select defaults match defined options.
- Verifies that every single option declared in the tool registry is actively referenced (wired) in the runtime code.

### Inventory Validation Tests (`tests/inventory/inventory.test.cjs`)
Validates the structural integrity of `master_inventory.json`:
- Asserts that every tool slug in `tools.ts` exists in the inventory.
- Asserts scores are numeric and constrained within the `0-10` boundary.
- Asserts status fields strictly use valid status strings (`🟢 Production Ready`, etc.).

### Dataset Validation Tests (`tests/datasets/datasets.test.cjs`)
Ensures data arrays and maps in `src/scripts/data/generator-datasets.ts` are structured correctly and have no duplicate mappings.

### Integration Tests (`tests/integration/integration.test.cjs`)
Executes representative generators from every major tool category to verify that the structured HTML cards, sections, layouts, and style lists render correctly.

---

## 4. How to Run Tests Locally

All tests are integrated into `package.json` scripts and run using the internal `node` instance:

- **Run all tests (1770+ test cases)**:
  ```bash
  npm run test
  ```
- **Run unit, dataset, and smoke tests only**:
  ```bash
  npm run test:unit
  ```
- **Run integration tests only**:
  ```bash
  npm run test:integration
  ```
- **Run option coverage tests only**:
  ```bash
  npm run test:options
  ```
- **Run inventory tests only**:
  ```bash
  npm run test:inventory
  ```
- **Run complete validation pipeline (Typecheck, Build, and Tests)**:
  ```bash
  npm run verify
  ```

---

## 5. Continuous Integration (CI) Pipeline

A GitHub Actions workflow is configured in `.github/workflows/ci.yml`. It runs automatically on every `push` and `pull_request` to the `main` branch.

It executes the following steps sequentially, failing immediately on the first error:
1. **Checkout Code**: Fetches the branch code.
2. **Setup Node.js**: Mounts Node version `22` with cached npm modules.
3. **Install Dependencies**: Restores all packages using `npm ci`.
4. **Run TypeScript Check**: Validates syntax correctness via `npm run typecheck` (`astro check`).
5. **Build Platform**: Tests compilation of the static Astro website via `npm run build`.
6. **Run Quality Automation Test Suite**: Executes the complete 1770+ test suite via `npm run test`.
7. **Bundle Performance Budget Verification**: Asserts that total build sizes fall below performance limits.
8. **Run Production Build Verification**: Executes build validation rules.
