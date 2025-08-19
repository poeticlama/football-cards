import { test, expect } from "@playwright/test"

test("Add a player", async ({ page }) => {
  await page.goto("http://localhost:5173/login")
  await page.fill("#email", "mock@email.com")
  await page.fill("#password", "123123")
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL("http://localhost:5173/")

  await page.getByRole("link", { name: "+ Add new player" }).click()

  await page.fill("#name", "Test Player")
  await page.fill("#age", "20")
  await page.fill("#club", "Test FC")
  await page.fill("#position", "ST")
  await page.fill(
    "#image",
    "https://img.a.transfermarkt.technology/portrait/header/default.jpg?lm=1",
  )
  await page.fill("#rating", "90")
  await page.fill("#matches", "50")
  await page.fill("#goals", "40")
  await page.fill("#assists", "10")

  await page.click("button:has-text('Add Player')")

  await expect(page).toHaveURL("http://localhost:5173/")
})
