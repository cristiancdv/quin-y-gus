# Quin y Gus — repository overlay

This file records what **this repo confirms** and what the practice document assumes that **is not here yet**. If they conflict, the repository wins.

## Confirmed stack

- App: **quin-y-gus** (`app/`, App Router)
- Package manager: `pnpm` (`pnpm@11.25.0`)
- Next.js `16.3.4`, React `19.2.8`, TypeScript `^5` (`strict: true`)
- Styling: Tailwind CSS `4` (`@tailwindcss/postcss`)
- Lint: ESLint `^9` + `eslint-config-next` `16.3.4`
- Alias: `@/*` → project root
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`

## Installed dependencies

- Google APIs (`googleapis`), Embla Carousel, Radix UI, Lucide React,
  `react-countdown`, `server-only`, Sonner, and Zod
- Every dependency update must be recorded in this file.

Not installed: authentication, a test runner, and a global state library.

## Environment variables

- Every variable added to `.env` must have a corresponding example in `.env.example`.

## Supplemental documentation references

When implementation requires framework or library-specific behavior, consult the locally installed documentation before relying on memory or generic examples. The repository-local reference file is:

- [.agents/rules/library-docs-reference.md](library-docs-reference.md)

In case documentation is required for a dependency, use the relevant section in that file and prefer the exact installed version from `node_modules`.

Examples:
- In case documentation is required for Next.js App Router behavior, read the files referenced in [library-docs-reference.md](library-docs-reference.md).
- In case documentation is required for Google APIs or Sheets integration, use [googleapis/README.md](../../node_modules/googleapis/README.md) as the source of truth.
- In case documentation is required for Tailwind, shadcn/ui, Lucide React, or countdown behavior, use the corresponding README in the dependency folder under `node_modules`.
