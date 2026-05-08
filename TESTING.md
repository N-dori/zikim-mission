Testing
=======

This project is configured with Jest + @testing-library/react + MSW for unit and integration tests.

Run tests locally:

```bash
npm ci
npm test
```

Files added by the test scaffold:

- `jest.config.cjs` — Jest configuration (ts-jest, jsdom)
- `jest.setup.ts` — registers `@testing-library/jest-dom`, provides `fetch` via `node-fetch`, and starts MSW server
- `src/test/handlers.ts` — MSW handlers that mock the API endpoints used in example tests
- `src/test/mockServer.ts` — MSW server setup
- `src/test/App.test.tsx` — example smoke test
- `src/test/api.e2e.test.ts` — example integration test hitting MSW-mocked endpoints
- `.github/workflows/frontend-test.yml` — CI workflow to run tests on push and PR

Notes:
- Tests are fully mocked and do not require real secrets.
- If you prefer a different Jest / Babel / TypeScript setup, ask before I change build configs.
