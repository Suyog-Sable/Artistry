import { test, expect } from "@playwright/test";

test("contact links stay usable across navigation breakpoints and keyboard input", async ({ page }) => {
  const instagramUrl = "https://www.instagram.com/mee_artistry949?psln=MXQxaTAwMWhveXdrZQ==";
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 900, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/shop/two-person-portrait");
    const mobile = width <= 900;
    const toggle = page.getByRole("button", { name: "Open navigation" });
    if (mobile) await toggle.click();
    const navigation = mobile
      ? page.getByRole("navigation", { name: "Mobile navigation" })
      : page.locator(".header");
    await expect(navigation.getByRole("link", { name: "Explore art", exact: true })).toHaveAttribute("aria-current", "page");
    const instagram = navigation.getByRole("link", { name: /Artistry on Instagram/ });
    const whatsapp = navigation.getByRole("link", { name: "Let’s talk", exact: true });
    await expect(instagram).toBeVisible();
    await expect(instagram).toHaveAttribute("href", instagramUrl);
    await expect(whatsapp).toBeVisible();
    const orderUrl = new URL((await page.locator(".order-action a").getAttribute("href"))!);
    const contactUrl = new URL((await whatsapp.getAttribute("href"))!);
    expect(contactUrl.origin).toBe("https://wa.me");
    expect(contactUrl.pathname).toBe(orderUrl.pathname);
    expect(contactUrl.searchParams.get("text")).toContain("Hello Artistry!");
    await expect(whatsapp.locator("svg")).toBeVisible();
    for (const link of [instagram, whatsapp]) {
      const box = (await link.boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    if (mobile) {
      await whatsapp.focus();
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await page.setViewportSize({ width: 1200, height: 900 });
      await expect(page.locator("#mobile-nav")).toHaveCount(0);
    }
  }
});

test("all routes fit mobile and desktop, with no broken images or browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const routes = [
    "/",
    "/shop",
    "/gallery",
    "/about",
    "/faq",
    "/contact",
    "/shop/two-person-portrait",
    "/shop/four-person-portrait",
    "/shop/family-portrait",
    "/shop/handmade-lippan",
    "/shop/god-themed-lippan",
  ];
  for (const width of [320, 360, 375, 390, 430, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [320, 390, 768, 820, 1024, 1440].includes(width)
      ? routes
      : ["/", "/shop", "/shop/two-person-portrait"]) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          { message: `Overflow on ${route} at ${width}px` },
        )
        .toBe(true);
      const broken = await page
        .locator("img")
        .evaluateAll((imgs) =>
          (imgs as HTMLImageElement[])
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.src),
        );
      expect(broken).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
  await page.goto("/");
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
});
test("filters, mobile navigation, FAQ and not-found page work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Explore art" })
    .click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Portraits", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Lippan art", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Sacred art", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "All artwork", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(5);
  await page.goto("/faq");
  await page.getByText("How do I place an order?", { exact: true }).click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.goto("/shop/nonexistent");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "blank canvas",
  );
});
test("portrait and Lippan choices produce accurate encoded WhatsApp messages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/shop/two-person-portrait");
  const chat = page.locator(".order-action a");
  const message = async () =>
    new URL((await chat.getAttribute("href"))!).searchParams.get("text")!;
  expect(await message()).toContain("₹499");
  await page.getByLabel("Number of people").selectOption("4");
  await page.getByRole("radio", { name: "A3" }).check();
  await page
    .getByLabel("Frame preference")
    .selectOption("With a frame · price to be confirmed");
  await page
    .getByLabel("A little more about your idea")
    .fill("Anniversary & a warm palette");
  let text = await message();
  expect(text).toContain("Number of people: 4");
  expect(text).toContain("Portrait size: A3");
  expect(text).toContain("₹899");
  expect(text).toContain("With a frame");
  expect(text).toContain("Anniversary & a warm palette");
  expect(text).toContain("attach my reference photographs");
  await page.getByLabel("Number of people").selectOption("6");
  expect(await message()).toContain("₹1,999");
  await page.getByLabel("Number of people").selectOption("11");
  expect(await message()).toContain("₹1,999");
  expect(await message()).toContain("Number of people: 11 or more");
  await page.getByLabel("Number of people").selectOption("3");
  expect(await message()).toContain("Quote required");
  await expect(page.locator(".price-total")).toContainText("Request a quote");
  expect(await chat.getAttribute("href")).toMatch(
    /^https:\/\/wa.me\/[1-9]\d{7,14}\?text=/,
  );
  await expect(chat).toHaveAttribute("target", "_blank");
  await page.locator('#notes').evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
  const notesBox = await page.locator('#notes').boundingBox();
  const ctaBox = await page.locator('.order-action').boundingBox();
  expect(notesBox!.y + notesBox!.height).toBeLessThanOrEqual(ctaBox!.y);
  await expect(page.locator('.order-action')).toHaveCSS('position', 'fixed');
  await page.screenshot({
    path: "test-results/customization-mobile.png",
    fullPage: true,
  });
  for (const [slug, price] of [
    ["handmade-lippan", "₹800"],
    ["god-themed-lippan", "₹1,000"],
  ]) {
    await page.goto(`/shop/${slug}`);
    await page
      .getByLabel("Colour preference")
      .selectOption("Terracotta tones · request");
    await page
      .getByLabel("A little more about your idea")
      .fill("Please discuss the design and dimensions");
    text = await message();
    expect(text).toContain(price);
    expect(text).toContain("Terracotta tones");
    expect(text).toContain("Please discuss");
    expect(text).toContain("additional charges");
  }
});
