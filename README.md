# Sports Store

A ready-to-run React + Vite sports store.

## Run locally

1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite.

For a production build:

```bash
npm run build
npm run preview
```

## Product data

All product data is in `public/products.json`.

Each product has:
- `id`
- `name`
- `price`
- `image`
- `stock`

Set `stock` to `0` to show **Out of Stock** and the WhatsApp button.

## WhatsApp

Open `src/App.jsx` and change:

```js
const WHATSAPP_NUMBER = '919999999999';
```

to your WhatsApp number in international format, without `+`, spaces, or dashes.

## Images

The product catalog now uses real photography hosted by Unsplash instead of the built-in SVG placeholder illustrations. The image URLs are stored directly in `public/products.json`, so no image-import code changes are required.

If you prefer to self-host the images for production, download the images, place them in `public/images/`, and change each `image` value in `products.json` to the corresponding local path. Check the image provider's current license/attribution requirements before publishing.

## Vercel

This is a Vite project. Import the project into Vercel. The standard Vite settings work:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

No backend/database is required for this version.


## Current catalog
The store contains exactly 4 categories with 3 related real-photo products in each: Running, Football, Cricket, and Knee Support (12 products total).
