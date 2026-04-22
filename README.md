# Auction Project

A Nuxt 4 application for managing auction sales and their related lots.

## Stack

- Nuxt 4
- Vue 3
- TypeScript
- Nuxt UI
- Tailwind CSS
- Nuxt Image
- JSON Server
- Zod

## Features

- Auction sales listing
- Sale detail page with related lots
- Sale creation flow
- Dynamic lot management during sale creation
- Form validation with Zod
- Mock API with JSON Server
- Responsive interface with dark mode support

## Requirements

- Node.js
- pnpm

This project uses `pnpm@10.33.0`.

## Installation

Install dependencies:

```bash
pnpm install
```

Copy the example environment file to `.env`:

```bash
cp .env.example .env
```

This step is required so the application knows where to find the mock API.

The default `.env.example` file contains:

```env
API_PORT=3001
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Local Development

The application needs two processes: the mock API and the Nuxt dev server.

In a first terminal, start the API:

```bash
pnpm api
```

The JSON Server API starts on:

```text
http://localhost:3001
```

In a second terminal, start the Nuxt application:

```bash
pnpm dev
```

The application will be available at the URL printed by Nuxt, usually:

```text
http://localhost:3000
```

## Available Scripts

```bash
pnpm dev
```

Starts the Nuxt development server.

```bash
pnpm api
```

Starts the mock API with JSON Server using `db.json`.

```bash
pnpm build
```

Builds the application for production.

```bash
pnpm preview
```

Previews the production build.

```bash
pnpm lint
```

Runs ESLint.

```bash
pnpm lint:fix
```

Runs ESLint with automatic fixes.

```bash
pnpm typecheck
```

Runs the Nuxt/TypeScript type checker.

## Project Structure

```text
app/
  components/      Vue components
  composables/     Reusable app logic
  pages/           Nuxt pages
  schemas/         Zod schemas
  assets/styles/   Global styles
shared/
  types/           Shared types
scripts/
  start-mock-api.mjs
db.json            Mock JSON Server data
```

## Mock Data

Sales and lots are stored in `db.json`.

JSON Server exposes the following resources:

```text
http://localhost:3001/sales
http://localhost:3001/lots
```

## Troubleshooting

If the application shows an error while loading sales, check that:

- the `.env` file exists;
- `pnpm api` is running;
- `NUXT_PUBLIC_API_BASE_URL` points to the correct port;
- the Nuxt dev server was restarted after changing `.env`.
