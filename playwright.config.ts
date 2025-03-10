import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/step-definitions', // Point to step definitions
  timeout: 30000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
  reporter: 'html',
});
