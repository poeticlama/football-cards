import { test, expect } from "@playwright/test"

test("Login with correct data", async ({ page }) => {
  await page.goto("http://localhost:5173/login")

  await page.fill("#email", "wrong@test.com")
  await page.fill("#password", "invalidpassword")

  const emailField = page.locator("#email")
  const passwordField = page.locator("#password")

  await page.click('button[type="submit"]')

  const errorMessage = page.locator("text=Wrong email or password")
  await expect(errorMessage).toBeVisible()
  await expect(emailField).toBeEmpty()
  await expect(passwordField).toBeEmpty()

  await page.fill("#email", "mock@email.com")
  await page.fill("#password", "123123")

  await page.click('button[type="submit"]')
  await expect(page).toHaveURL("http://localhost:5173/")
})
