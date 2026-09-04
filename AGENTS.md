<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

This repository keeps a single entry point for AI coding instructions. Read this file first, then follow the linked rule files it points to. Other agent customization files should delegate here instead of duplicating repo guidance.

## Project snapshot

- App: quin-y-gus using the Next.js App Router
- Package manager: pnpm (`pnpm@11.25.0`)
- Runtime and framework: Next.js `16.3.4`, React `19.2.8`, TypeScript `^5`
- Styling: Tailwind CSS `4` and shadcn-style UI primitives
- Main directories: `app/`, `components/`, `lib/`, `public/`
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`

## Required reading

- [.agents/rules/basic-rules.md](.agents/rules/basic-rules.md)
- [.agents/rules/nextjs-typescript-ai-agent-rules.md](.agents/rules/nextjs-typescript-ai-agent-rules.md)
- [.agents/rules/library-docs-reference.md](.agents/rules/library-docs-reference.md)
- [README.md](README.md)

## Working conventions

- Keep AI guidance centralized in this file; do not duplicate the same standards elsewhere.
- Prefer repository conventions and locally installed library documentation over generic examples.
- Keep changes minimal and aligned with the existing App Router and TypeScript setup.
- Treat environment variables and external integrations as security-sensitive unless the repo explicitly confirms otherwise.
- Validate behavior with the repo scripts before considering the task complete.

## Delegation rule

- [`CLAUDE.md`](CLAUDE.md) should refer to this file instead of restating project rules.
- [.cursor/rules/agents.mdc](.cursor/rules/agents.mdc) also delegates through this file.
