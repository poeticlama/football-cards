import { defineConfig } from "@playwright/test"

export default defineConfig({
  webServer: {
    command: "npm run preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "tests/e2e",
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
  },
})
