# Algerian E-Commerce — Frontend

Web storefront and admin dashboard for the Algerian e-commerce platform, built with **Next.js 16** + **React 19** + **Tailwind CSS v4** + **TypeScript**.

Deployed on Vercel: <https://front-algeria-commerce.vercel.app>

## Tech Stack

- **Framework:** Next.js (App Router) 16.3
- **UI:** React 19, Tailwind CSS v4, lucide-react icons
- **Language:** TypeScript

## Requirements

- Node.js 20+
- npm

## Getting Started (local)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API URL

Create a `.env.local` file at the project root (git-ignored):

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Point it to the backend. In local development this is `http://localhost:8000` (the FastAPI backend). For a deployed build, set it to the deployed backend URL (e.g. `https://backalgeriacommerce.onrender.com`) via your hosting provider's environment settings.

### 3. Run the development server

```bash
npm run dev
```

Open <http://localhost:3000> with your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Running with Docker Compose

From the repository root of the full project, the frontend runs alongside the backend and PostgreSQL:

```bash
docker compose up --build
```

The frontend is exposed on port `3000`.

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:8000` |

## Project Structure

```
app/
  admin/           # Admin dashboard (products, categories, orders, shipping, settings, landing builder)
  landing/         # Storefront landing page
  p/[slug]/        # Public product pages
  sign-up/         # Sign-up page
components/
  admin/           # Admin UI components (product editor, category, orders, dashboard, shipping, landing-builder)
lib/
  shipping/        # Shipping API client, hooks, types, translations
  landing-page/    # Landing page builder state/types/hooks
  product-prototype/ # Product prototype categories/types
  images.ts        # Image URL helper
  demo-products.ts # Demo product data
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## Security Notes

- `.env.local` and other env files are git-ignored; never commit real secrets.
- Only committed configuration uses safe defaults; real API URLs are provided via environment variables.
