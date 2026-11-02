import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

// Checks the real, unconfigured production build. Does not send any messages.
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3101",
  ],
  { windowsHide: true, stdio: "pipe" },
);
server.stderr.on("data", (chunk) => process.stderr.write(chunk));
let browser;
try {
  const deadline = Date.now() + 45000;
  while (true) {
    try {
      if ((await fetch("http://127.0.0.1:3101")).ok) break;
    } catch {}
    if (Date.now() > deadline)
      throw new Error("Production server did not start");
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:3101/shop/two-person-portrait");
  await page.getByLabel("Number of people").selectOption("4");
  assert.match(await page.locator(".price-total").innerText(), /₹899/);
  await page.getByRole("button", { name: "Discuss on WhatsApp" }).click();
  assert.match(
    await page.locator('.order-action [role="status"]').innerText(),
    /once Artistry adds its business number/,
  );
  assert.equal(await page.locator('a[href^="https://wa.me/"]').count(), 0);
  await page.goto("http://127.0.0.1:3101/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .isVisible(),
    true,
  );
  await page.keyboard.press("Escape");
  await page.screenshot({
    path: "test-results/production-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/production-desktop.png",
    fullPage: true,
  });
  console.log(
    "Production smoke check passed: pricing, unconfigured WhatsApp notice, mobile menu, Escape and screenshots.",
  );
} finally {
  await browser?.close();
  server.kill();
}
