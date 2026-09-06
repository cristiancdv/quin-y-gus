<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

This is the entry point for AI coding instructions. Read it before changing
code, then read the linked project inventory and rules. `CLAUDE.md` and
`.cursor/rules/agents.mdc` must delegate here rather than duplicate guidance.

## Project snapshot

- Product: a Spanish, mobile-first wedding invitation for Valentina and Sebastián
- App: one App Router route (`app/page.tsx`), composed from sections and client-side interactive islands
- Package manager: pnpm (`pnpm@11.25.0`)
- Runtime and framework: Next.js `16.3.4`, React `19.2.8`, TypeScript `^5` in strict mode
- Styling: Tailwind CSS `4` with repository-local, shadcn-style primitives in `components/ui/`
- Data and integrations: static content in `data/`; validated Server Actions write RSVP and photo-wall metadata to Google Sheets
- Main directories: `app/`, `actions/`, `components/`, `data/`, `lib/`, `types/`, and `public/`
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`

## Required reading

- [.agents/config.md](.agents/config.md) — verified project inventory, boundaries, environment variables, and known launch limitations
- [.agents/rules/basic-rules.md](.agents/rules/basic-rules.md)
- [.agents/rules/nextjs-typescript-ai-agent-rules.md](.agents/rules/nextjs-typescript-ai-agent-rules.md)
- [.agents/rules/library-docs-reference.md](.agents/rules/library-docs-reference.md)
- [README.md](README.md)

## Working conventions

- Keep AI guidance centralized in this file; do not duplicate the same standards elsewhere.
- Prefer repository conventions and locally installed library documentation over generic examples.
- Keep changes minimal and aligned with the existing App Router and TypeScript setup.
- Treat environment variables and external integrations as security-sensitive unless the repo explicitly confirms otherwise.
- Use `pnpm`, never generate a second lockfile, and do not upgrade dependencies unless requested.
- Validate behavior with the narrowest applicable repo script before considering the task complete. This repository has no test runner; `pnpm lint` and, when framework behavior is touched, `pnpm build` are the baseline checks.

## Delegation rule

- [`CLAUDE.md`](CLAUDE.md) should refer to this file instead of restating project rules.
- [.cursor/rules/agents.mdc](.cursor/rules/agents.mdc) also delegates through this file.
