import { test, expect } from "@playwright/test"

test("Players are sorted by rating", async ({ page }) => {
  await page.goto("http://localhost:5173/login")
  await page.fill("#email", "mock@email.com")
  await page.fill("#password", "123123")

  await page.click('button[type="submit"]')
  await expect(page).toHaveURL("http://localhost:5173/")

  await page.selectOption("#sort", "rating")

  const ratings = await page
    .locator("[data-testid='player-rating']")
    .allTextContents()
  const nums = ratings.map(r => Number(r))

  for (let i = 1; i < nums.length; i++) {
    expect(nums[i - 1]).toBeGreaterThanOrEqual(nums[i])
  }
})
