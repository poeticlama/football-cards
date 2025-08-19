import { defineConfig } from "@playwright/test"

export default defineConfig({
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
  },
})
