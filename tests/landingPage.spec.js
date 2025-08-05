import { test, expect, } from "@playwright/test";


test.describe("Landing page", () => {
    test("user should see Anime Quiz Challenge", async ({page}) => {
        await page.goto('http://127.0.0.1:5500'); // Make sure you navigate to the page first
         await expect(page.getByText("Anime Quiz Challenge")).toBeVisible()
       

    })
})

