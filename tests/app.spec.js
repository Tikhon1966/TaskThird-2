const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { userEmail, userPassword } = require("../user");

test("Successful authorization", async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 5000,
    });
    const page = await browser.newPage("https://netology.ru/?modal=sign_in");
    await page.goto("https://netology.ru/?modal=sign_in");

    await page.fill('[placeholder="Email"]', userEmail);

    await page.fill('[placeholder="Пароль"]', userPassword);

    await page.click('[data-testid="login-submit-btn"]');
    await expect(page).toHaveURL("https://netology.ru/profile");
    await expect(page.locator("h2")).toContainText(["Моё обучение"]);
    await page.screenshot({
        path: "./screanshots/screenshotSuccessful.png",
        fullPage: true,
    });
    await browser.close();
}, 5000);

test("Unsuccessful authorization", async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 5000,
    });
    const page = await browser.newPage("https://netology.ru/?modal=sign_in");
    await page.goto("https://netology.ru/?modal=sign_in");

    await page.fill('[placeholder="Email"]', "asdf@gfds.com");

    await page.fill('[placeholder="Пароль"]', "zxccv");

    await page.click('[data-testid="login-submit-btn"]');
    const error = await page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
    await page.screenshot({
        path: "./screanshots/screenshotUnsuccessful.png",
        fullPage: false,
    });
    await browser.close();
}, 5000);
