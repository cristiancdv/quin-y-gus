# Quin y Gus — verified project configuration

This inventory describes the repository as inspected on 2026-09-06. It is a
source of project facts for agents; `package.json`, lockfile, source code, and
framework configuration take precedence if they later differ.

## Product and architecture

- A Spanish, mobile-first wedding invitation. The desktop layout intentionally
  presents a QR-based message instead of the invitation experience.
- One App Router page: `app/page.tsx`. It composes presentation sections; the
  root layout owns fonts, metadata, the Sonner toaster, and the mobile/desktop
  shell.
- Server Components are the default. Client Components are limited to
  interaction-heavy areas such as the RSVP flow, photo selector, music toggle,
  progress bar, carousel, countdown, and animated sections.
- Static event copy and media references belong in `data/wedding.ts` and
  `data/sections.ts`. Keep pages and sections presentational rather than
  scattering event details through the component tree.

## Toolchain

- Node requirements follow Next.js 16: Node.js 20.9+ and TypeScript 5.1+.
- Package manager: pnpm 11.25.0. Use `pnpm`; preserve `pnpm-lock.yaml`.
- Next.js 16.3.4, React/React DOM 19.2.8, strict TypeScript, and the `@/*`
  alias to the repository root.
- Tailwind CSS 4 runs through `@tailwindcss/postcss`; tokens and global styles
  are in `app/globals.css`.
- ESLint 9 uses `eslint-config-next/core-web-vitals` and its TypeScript config.
  There is no formatter or test runner configured.
- `next.config.ts` currently contains no enabled project options. In Next 16,
  `next dev` and `next build` use Turbopack by default.

## UI and dependency conventions

- `components/ui/` contains local shadcn-style primitives configured by
  `components.json` (`base-nova`, RSC, Lucide icons). Do not assume the
  `shadcn` CLI package itself is installed.
- Use Lucide React for interface icons, Embla through the local carousel
  primitive, `react-countdown` for the event timer, Framer Motion for existing
  gesture/section animation, Sonner for notifications, and `qrcode.react` for
  the desktop QR code. Do not add overlapping libraries without a concrete
  requirement.
- Images and audio are local assets under `public/images/` and `public/audio/`.
  Use `next/image` for managed images and supply dimensions or `fill` plus
  `sizes` as appropriate.

## Forms, Google Sheets, and security boundaries

- `actions/rsvp.ts` and `actions/photo-wall.ts` are public Server Action
  boundaries. They validate `FormData` with Zod schemas in `lib/validations/`
  before calling Google Sheets adapters.
- Google credentials and provider calls stay under `lib/google-sheets/`, whose
  server-only client prevents imports into Client Components. Spreadsheet IDs,
  tabs, and ranges are centralized in `lib/google-sheets/config.ts`.
- In development without credentials, adapters log simulated submissions. In
  production, missing configuration and provider failures return user-facing
  errors rather than pretending the data was saved.
- The photo-wall action validates a selected file but **does not upload binary
  media**. It currently persists only the file name to Sheets. Before launch,
  connect an approved file store, upload server-side, persist the resulting
  URL, and define its authorization, size, retention, and failure behavior.
- This public invitation currently has no authentication or rate limiting.
  Introduce either only with an explicit product/security decision; any future
  privileged action must authenticate and authorize on the server.

## Environment variables

`.env.example` is the public contract for environment setup. Add every new
variable there, never commit `.env*` files, and never expose credentials with a
`NEXT_PUBLIC_` prefix.

| Variable | Visibility | Purpose |
| --- | --- | --- |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Server-only | RSVP/photo-wall spreadsheet ID |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Server-only | Google service-account email |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Server-only | Service-account private key; accepts literal `\\n` escapes |
| `NEXT_PUBLIC_EVENT_QR_URL` | Public | URL encoded into the desktop QR code |
| `NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL` | Public | Link used for the playlist section |

## Verification

Run the narrowest relevant check after a change:

1. `pnpm lint` for TypeScript/React and lint-sensitive work.
2. `pnpm build` when routes, Server/Client boundaries, metadata, image
   configuration, or production behavior changes.
3. Manually check the small viewport first for interactive or visual changes;
   also check the intentional desktop QR state when touching layout.

Report checks that could not run. Do not claim a real Sheets submission or a
photo upload was verified without configured, authorized test infrastructure.
