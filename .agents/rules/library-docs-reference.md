# Local library documentation references

This file is a supplementary reference for the repository. When a task requires checking the official documentation for an installed dependency, use the local documentation in `node_modules` as the first source of truth before relying on external memory or generic examples.

## Rule of use

- Prefer the exact installed version from this repository.
- Use the local docs for APIs, configuration, and framework behavior supported by the current version.
- If a rule or pattern conflicts with the installed library version, the installed version wins.
- When the task requires library-specific guidance, read the relevant local documentation file before implementing code.

## Reference index

### Next.js / App Router
- Official docs entry: [../../node_modules/next/dist/docs/index.md](../../node_modules/next/dist/docs/index.md)
- App Router guides: [../../node_modules/next/dist/docs/01-app](../../node_modules/next/dist/docs/01-app)
- Pages Router docs: [../../node_modules/next/dist/docs/02-pages](../../node_modules/next/dist/docs/02-pages)
- Architecture docs: [../../node_modules/next/dist/docs/03-architecture](../../node_modules/next/dist/docs/03-architecture)
- Runtime package readme: [../../node_modules/next/README.md](../../node_modules/next/README.md)
- AGENTS rule for this package: [../../node_modules/next/AGENTS.md](../../node_modules/next/AGENTS.md)

### React
- Package readme: [../../node_modules/react/README.md](../../node_modules/react/README.md)
- React runtime package: [../../node_modules/react](../../node_modules/react)

### TypeScript
- Package readme: [../../node_modules/typescript/README.md](../../node_modules/typescript/README.md)

### ESLint
- Package readme: [../../node_modules/eslint/README.md](../../node_modules/eslint/README.md)
- Next.js ESLint config: [../../node_modules/eslint-config-next/README.md](../../node_modules/eslint-config-next/README.md)

### Tailwind CSS
- Package readme: [../../node_modules/tailwindcss/README.md](../../node_modules/tailwindcss/README.md)
- PostCSS integration: [../../node_modules/@tailwindcss/postcss/README.md](../../node_modules/@tailwindcss/postcss/README.md)

### Google APIs / Sheets integration
- Package readme: [../../node_modules/googleapis/README.md](../../node_modules/googleapis/README.md)
- Google auth / API guidance: [../../node_modules/googleapis/README.md](../../node_modules/googleapis/README.md)

### shadcn/ui
- Package readme: [../../node_modules/shadcn/README.md](../../node_modules/shadcn/README.md)

### Lucide React
- Package readme: [../../node_modules/lucide-react/README.md](../../node_modules/lucide-react/README.md)

### react-countdown
- Package readme: [../../node_modules/react-countdown/README.md](../../node_modules/react-countdown/README.md)

### Base UI
- Package readme: [../../node_modules/@base-ui/react/README.md](../../node_modules/@base-ui/react/README.md)

### Utility libraries
- clsx: [../../node_modules/clsx/README.md](../../node_modules/clsx/README.md)
- tailwind-merge: [../../node_modules/tailwind-merge/README.md](../../node_modules/tailwind-merge/README.md)
- class-variance-authority: [../../node_modules/class-variance-authority/README.md](../../node_modules/class-variance-authority/README.md)
- tw-animate-css: [../../node_modules/tw-animate-css/README.md](../../node_modules/tw-animate-css/README.md)

## Supplemental rule wording

Use this phrase when documentation is required during implementation:

> In case documentation is required for library behavior, consult the local installed source in node_modules before making assumptions. Prefer the exact version in this repository and use the corresponding local documentation as the authoritative reference.

## Examples

- In case documentation is required for Next.js routing or data fetching, consult [../../node_modules/next/dist/docs/index.md](../../node_modules/next/dist/docs/index.md) and the relevant App Router guide under [../../node_modules/next/dist/docs/01-app](../../node_modules/next/dist/docs/01-app).
- In case documentation is required for Google Sheets or Google APIs auth patterns, consult [../../node_modules/googleapis/README.md](../../node_modules/googleapis/README.md).
- In case documentation is required for UI primitives or icons, consult [../../node_modules/shadcn/README.md](../../node_modules/shadcn/README.md) and [../../node_modules/lucide-react/README.md](../../node_modules/lucide-react/README.md).
- In case documentation is required for utility functions such as class merging or animation helpers, consult the corresponding package README in `node_modules`.

## Practical intent

This file exists so the project has a declared, repository-local documentation source for each dependency. It is intentionally supplemental and should be used when a task needs exact behavior, API contracts, or version-sensitive guidance from the packages that are already installed.
