# Artistry

A standalone, mobile-first Next.js App Router website for **Artistry — Turning Memories Into Art.** Built with TypeScript, Tailwind CSS, Lucide icons, reusable components and locally hosted Cormorant Garamond / DM Sans fonts. Small CSS transitions respect reduced-motion preferences; no animation dependency is needed.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local` and `npm.cmd` if script execution policies block `npm`. Open http://127.0.0.1:3000.

```sh
npm run build
npm start
```

Deploy to a host supporting Next.js 16 and Node.js. No database or backend service is required. All content routes are prerendered at build time.

## Enable WhatsApp

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (or the deployment environment) to the real business number in international format, including country code, **digits only**. No plus sign, spaces or dashes. Restart the dev server; rebuild/redeploy for production because public environment variables are embedded at build time.

The number is intentionally blank. An absent or invalid value makes the buttons show an honest setup notice instead of sending a customer to an invented number. Once configured, buttons open `wa.me` with URL-encoded product selections and a price breakdown. Reference photos are attached by the customer directly in WhatsApp; the website does not upload or store them. This handoff does not automatically send the message or confirm an order.

## Structure

```text
src/app/                 Root layout, shared styles, home and 404
  shop/                  Filterable collection
    [slug]/              Five statically generated product pages
  gallery/               Linked illustrative gallery
  about/                 About the artist
  faq/                   Accessible expandable FAQs
  contact/               WhatsApp contact and order guidance
src/components/          Header, footer, cards, artwork, filters, order form, FAQ, WhatsApp link
src/lib/catalog.ts       Central product data, prices, asset paths and FAQs
src/lib/whatsapp.ts      Central WhatsApp configuration and URL generation
public/art/              Original lightweight SVG placeholder illustrations
tests/site.spec.ts       Responsive, navigation and ordering tests
```

## Content and pricing

Edit `src/lib/catalog.ts` to replace product names/descriptions, images, pricing and FAQ content. The portrait form reads its price tiers directly from this catalogue.

- Two people: ₹499; four people: ₹899; six or more: ₹1,999. Frame charges extra.
- Other group sizes: request a quote, without an invented price.
- Portrait sizes A4, A3, A2. No size surcharge or frame price is assumed.
- Handmade six-inch Lippan: ₹800. God-themed Lippan: ₹1,000; dimensions pending confirmation.
- Colour and design choices are requests subject to confirmation, not claims about stocked options.
- Delivery, customization, frame and size-related charges are explicitly unconfirmed. The displayed subtotal is never called a final total.

## Verification

```sh
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright development server on port 3100 uses a clearly test-only WhatsApp number to inspect generated link payloads without sending messages. Do not use that number in a production environment. Tests cover routes and overflow at 320, 360, 375, 390, 430 and 1440px, gallery image loading, filters, mobile navigation, FAQ, 404 and portrait/Lippan order details. Screenshots are saved under `test-results/`.

## Client information still needed

1. Actual business WhatsApp number.
2. Original artwork photographs and an artist photo. Current SVGs are illustrative placeholders, identified on the site; they are not completed commissions.
3. Artist name, biography and studio details. No qualifications, location, history, reviews or testimonials have been fabricated.
4. Actual frame choices/prices, size-dependent pricing, customization availability and any additional charges.
5. Production timelines, delivery areas/charges, payment arrangements and cancellation/revision/return policies.

There is no cart, login, payment gateway, upload endpoint, tracking integration or customer database.
