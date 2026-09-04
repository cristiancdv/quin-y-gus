# AI Coding Agent Rules — Next.js, React & Strict TypeScript — Google Sheets

**Version:** 3.1  
**Purpose:** Operating policy for AI coding agents working on a mobile-first Next.js application using TypeScript, Google Sheets as an external data source, and a defined UI stack.

> This file is an **agent operating policy**, not a generic style guide. Prioritize rules that affect architecture, correctness, security, performance, accessibility, maintainability, and verification. Do not waste agent context enforcing formatting that can be handled deterministically by the repository's tooling.

---

## 0. Rule Precedence

When rules conflict, apply this order of authority:

1. **User request and explicit acceptance criteria**
2. **Repository configuration and established project conventions**
3. **Official APIs and constraints of the installed framework/library versions**
4. **Security and correctness**
5. **Existing architecture and domain boundaries**
6. **Mobile performance and accessibility**
7. **Maintainability and TypeScript safety**
8. **Stylistic preferences**

Never change an existing project convention solely to make code conform to this document.

Never assume a library, runtime, package manager, authentication provider, validation library, styling system, or deployment platform unless the repository confirms it or the user explicitly requires it.

---

## 1. Repository-First Behavior

Before modifying code, inspect the smallest relevant set of repository files and establish:

- `package.json` and the actual package manager in use
- installed Next.js, React, and TypeScript versions
- `tsconfig.json`
- linting/formatting configuration
- `next.config.*`
- the relevant `app/` routes, layouts, and components
- existing data-access, Google Sheets, authentication, authorization, and validation modules
- existing UI primitives and shadcn/ui configuration
- existing testing conventions
- existing aliases and module boundaries

Prefer existing abstractions and project patterns over introducing new ones.

Do not migrate the package manager, runtime, framework version, state library, validation library, styling system, data source, or test framework unless explicitly requested or required to complete the task.

Do not infer architecture from this document when repository evidence provides a stronger signal.

---

## 2. Task Analysis and Change Discipline

Before coding, determine:

1. What behavior is requested.
2. Which files and architectural boundaries are actually involved.
3. Whether the task is UI, server, data, security, integration, refactoring, or debugging.
4. Which existing abstractions already solve part of the problem.
5. What can remain unchanged.
6. What must be verified after the change.

Make the **smallest coherent change** that satisfies the request.

Do not refactor unrelated code, rename unrelated files, reorganize directories, introduce unnecessary abstractions, or upgrade dependencies without a concrete reason.

Do not optimize prematurely. Establish correctness first, then optimize where there is evidence or a clear product/architecture requirement.

---

## 3. Architecture: Server by Default

For Next.js App Router applications:

- Prefer **Server Components by default**.
- Add `'use client'` only when a component needs client-only capabilities such as browser APIs, DOM event handlers, local interactive state, effects, or other client-bound hooks.
- Keep the client boundary as small as practical.
- Do not move an entire subtree to the client merely because one leaf component requires interactivity.
- Keep secrets, credentials, privileged data access, and server-only business logic on the server.
- Use `server-only` for modules that must never cross into client code when it improves boundary safety.

Do not use Client Components as a workaround for data fetching that can remain on the server.

Do not duplicate server-fetched data into client state unless there is a clear interactive reason.

---

## 4. Framework-Version Awareness

Always inspect the installed Next.js version before applying version-specific rules.

Use APIs, conventions, caching behavior, and generated types supported by the installed version instead of blindly copying examples from another major version.

For Next.js versions that use asynchronous request APIs, handle dynamic APIs according to the installed version's contract, including APIs such as:

- `cookies()`
- `headers()`
- `draftMode()`
- route `params`
- route `searchParams`

Prefer framework-generated route helpers such as `PageProps`, `LayoutProps`, and `RouteContext` when available and appropriate.

Framework file conventions are authoritative. A framework-required default export or filename takes precedence over generic export or naming preferences.

---

## 5. Runtime Data Validation

Treat all externally controlled runtime data as untrusted until validated.

Validate data at trust boundaries such as:

- request bodies
- `FormData`
- query strings and route parameters
- cookies and headers when values affect behavior or security
- Google Sheets data
- external API responses
- webhook payloads
- environment variables when their shape is not guaranteed
- persisted data crossing a compatibility boundary

Prefer the repository's existing validation solution. Do not add a new validation dependency only to satisfy this rule.

Zod is a preferred choice when it is already part of the project or when no project-standard validation library exists.

Do not use type assertions to make unvalidated external data appear trusted.

Prefer validation followed by typed application data:

```ts
const result = schema.safeParse(input)

if (!result.success) {
  // Handle expected validation failure.
}

const value = result.data
```

Use `parse()` when throwing on invalid input is intentional and consistent with the surrounding error model.

When practical, derive TypeScript types from runtime schemas instead of maintaining duplicate definitions.

Do not repeatedly validate already-trusted data at every layer without a concrete boundary-related reason.

---

## 6. Server Actions and Route Handlers Are Security Boundaries

Treat exported Server Actions and Route Handlers as public attack surfaces.

For privileged operations:

- authenticate when required
- authorize the specific operation
- validate every externally supplied input
- enforce ownership and permission checks on the server
- never trust client-provided roles, user IDs, organization IDs, permissions, hidden fields, or UI state
- never rely on obscurity, disabled controls, hidden inputs, or client-side checks for authorization

A Server Action must be safe to invoke directly, not only safe when reached through the intended UI.

Do not perform privileged mutations during rendering.

Keep authorization close to the mutation/data boundary so another caller cannot bypass it.

---

## 7. Secrets and Environment Variables

Never expose secrets to the browser.

Do not place credentials, private tokens, API secrets, private keys, signing keys, spreadsheet write credentials, or internal service credentials in browser-visible values.

Treat `NEXT_PUBLIC_*` variables as public browser data.

Do not import secret-bearing server modules into Client Components.

Never solve a client/server boundary problem by moving a secret into a public environment variable.

Validate required environment variables at startup or at the relevant server boundary when the project has an environment-validation pattern.

---

## 8. Google Sheets Integration

Treat Google Sheets as an **external infrastructure boundary**, not as the domain model.

Keep Google Sheets access server-side unless the repository establishes an explicitly secure alternative.

Never expose Google service-account credentials, OAuth client secrets, private keys, access tokens, or spreadsheet write credentials to the browser.

Prefer a dedicated server-side adapter/module for Google Sheets access. Pages, Server Components, Server Actions, and Route Handlers should depend on application/domain-facing functions rather than raw Google API calls wherever practical.

The Google Sheets adapter is responsible for translating provider-specific rows, ranges, and cell values into application data.

Do not pass raw Google Sheets rows directly into presentation code when a domain/application model is needed.

Validate and normalize values read from Sheets before treating them as trusted application data. Cell contents are runtime data even when the spreadsheet is internally maintained.

Centralize spreadsheet IDs, tab names, column mappings, and range definitions. Do not duplicate magic column indexes or ranges throughout the application.

Prefer explicit header-based mapping over fragile positional assumptions when practical.

Handle missing, empty, malformed, and unexpected cell values according to the application's domain requirements.

For writes:

1. validate the input
2. authorize the operation on the server
3. map application data to the sheet format in the adapter
4. perform the write
5. return an application-level result rather than leaking provider-specific response shapes

Do not introduce a database or ORM merely because Google Sheets is imperfect unless the task or architecture explicitly requires it.

---

## 9. Data Fetching, Caching and Revalidation

Choose caching behavior deliberately based on the data's semantics.

Before caching data, determine whether it is:

- request-specific
- user-specific
- authorization-sensitive
- immutable
- periodically stale
- safe to share across requests

Google Sheets reads should not automatically hit the provider on every request when the data can safely be stale or revalidated.

For content that is shared, non-sensitive, and allowed to be stale, prefer the installed Next.js version's supported caching/revalidation mechanisms rather than implementing an ad-hoc in-memory cache.

Use time-based revalidation or cache invalidation/tags when appropriate to the installed Next.js version and project configuration.

Do not cache user-specific or authorization-sensitive data in a shared scope unless the caching model explicitly isolates it.

Do not add `force-cache`, `no-store`, revalidation settings, cache tags, `use cache`, or dynamic rendering configuration merely to silence a symptom. First understand the data freshness and authorization requirements.

After a Google Sheets mutation, revalidate or invalidate only the affected data when freshness is required.

Do not make the initial mobile render wait on a live external read when a safe server-side cached or statically available representation can satisfy the product requirement.

When freshness is truly real-time or request-specific, prefer correctness over caching.

---

## 10. Mobile-First UI

The application is **mobile-first**.

When implementing responsive UI, design and validate the smallest viewport first. Add larger-screen adaptations progressively.

When Tailwind CSS is configured through shadcn/ui:

- unprefixed utilities represent the base/mobile layout
- use `sm:`, `md:`, `lg:`, `xl:`, and other responsive variants to enhance larger viewports
- do not use `sm:` as if it meant "mobile"
- avoid desktop-first layouts followed by mobile patches

Every responsive implementation must remain usable at narrow mobile widths without horizontal overflow unless horizontal scrolling is an intentional part of the component.

Prefer fluid sizing, wrapping, stacking, and constrained content widths over fixed desktop dimensions.

Do not require hover as the only way to discover or operate functionality. Mobile interactions must work without hover.

---

## 11. Mobile Accessibility and Touch Targets

All interactive controls must be comfortably operable by touch.

As a default accessibility target, interactive controls should provide at least a **44×44 CSS pixel hit area** where practical, including:

- buttons
- links that behave as controls
- carousel previous/next controls
- menu triggers
- close buttons
- icon-only controls
- timeline controls or markers when interactive

The visual icon itself does not need to be 44×44; the interactive hit area does.

Do not make controls technically clickable but practically unusable by adding tiny hit areas or placing controls too close together.

Use visible focus states and preserve keyboard accessibility even in mobile-first designs.

Do not use color alone to communicate state, status, or errors.

---

## 12. Images, Media and Mobile Performance

Prefer `next/image` for application-managed images unless a specific external-image constraint requires another approach.

Reserve layout space for images to avoid layout shifts.

For important above-the-fold imagery, use the installed Next.js version's documented mechanism for prioritizing the LCP image. Do not blindly copy `priority` or `preload` from another Next.js version; verify the API supported by the installed version.

Avoid unnecessarily large image assets on mobile.

Use appropriate dimensions, responsive sizing, and image quality for the real display size.

Do not load below-the-fold media eagerly without a reason.

Avoid client-side layout calculations that cause visible content to move after initial render.

---

## 13. Components, State and Interactivity

Prefer derived state over duplicated state.

Use local client state for genuinely client-owned state such as open/closed controls, transient input, focus state, or optimistic interaction.

Prefer URL state when state represents navigable, shareable, or filterable page state.

Use the repository's existing URL-state abstraction. Use native Next.js APIs when no project-standard abstraction exists. Do not introduce `nuqs` or another dependency solely because of this rule.

Use `useActionState` when UI state represents the result or state of an Action or form submission. Do not replace ordinary local UI state with `useActionState` without a concrete reason.

Use `useFormStatus` for form submission/pending state when appropriate, and ensure it is used within the relevant form subtree.

Do not use global client state for data that can remain server-owned or URL-owned.

---

## 14. UI Component Stack

The application uses this UI stack:

- **shadcn/ui** for reusable UI primitives and components, including buttons and carousels
- **Lucide React** for interface icons, including timeline icons
- **react-countdown** for countdown/timer behavior

Prefer these libraries over creating equivalent bespoke implementations.

Do not add another icon library, button library, carousel library, or countdown library when the required behavior can be achieved with the existing stack.

Use shadcn/ui components consistently with the repository's current configuration and composition patterns. Extend or compose existing components before creating a parallel design-system implementation.

Use Lucide React for application UI icons instead of Unicode symbols, emoji, hand-drawn inline SVG duplicates, or another icon package unless a product requirement explicitly requires a different asset.

Use `react-countdown` for countdown behavior when the requested feature is a countdown/timer. Do not create a parallel interval-based countdown abstraction unless the library cannot satisfy a documented requirement.

---

## 15. Accessibility and Semantic HTML

Prefer semantic HTML over generic `<div>` structures.

Use real buttons for actions and real links for navigation.

Forms must use correct labels, names, button semantics, validation messaging, and error associations where applicable.

Interactive controls must be keyboard accessible.

Icon-only buttons require an accessible name.

Decorative Lucide icons should be hidden from assistive technology when they convey no additional information.

Do not rely on color, hover, animation, or positional cues as the sole communication mechanism.

Respect reduced-motion preferences when animations are introduced, especially on mobile.

Do not make essential content or functionality depend entirely on client-side JavaScript when a progressive-enhancement-friendly server implementation is practical.

---

## 16. Loading, Suspense and Error Boundaries

Use Suspense when it creates a meaningful streaming or progressive-rendering boundary.

Use granular `loading.tsx` and `error.tsx` boundaries where they improve user experience or isolate failures.

Do not add Suspense or error boundaries mechanically to every component.

Distinguish between:

- expected validation/domain failures that the UI can handle as values
- authentication/authorization failures
- unexpected application failures that should propagate to the appropriate error boundary and logging path

Never swallow errors silently.

Do not fabricate fallback data merely to avoid an error unless that fallback is an explicit product requirement.

For slow external data such as Google Sheets, use appropriate server-side streaming or loading states rather than moving the entire page to the client.

---

## 17. TypeScript Safety

Use the repository's strict TypeScript configuration consistently.

Prefer:

- `unknown` over `any` for unknown data
- discriminated unions for explicit finite states or variants
- narrow domain types at boundaries
- `satisfies` when validating object literals without unnecessarily widening them
- inference for simple local/private values when an annotation adds no useful contract

Avoid `any`. When an external library forces it, contain the unsoundness at the narrowest possible boundary and document the reason when necessary.

Do not use `@ts-ignore` to bypass correctness problems.

Use `@ts-expect-error` only for an intentional, understood, stable compiler error, with a nearby explanation when the reason is not obvious.

Avoid assertions that merely silence TypeScript.

A type assertion is acceptable when a real invariant has been established by code or framework semantics and no better narrowing mechanism exists.

Prefer string unions, literal objects, or `as const` for simple finite values. Do not ban enums absolutely; follow domain needs and project conventions, while being cautious about publishing problematic `const enum` declarations across package boundaries.

Prefer explicit return types for public APIs, important domain functions, reusable library boundaries, and Server Actions when they protect a meaningful contract. Do not annotate trivial private functions merely for ceremony.

---

## 18. Domain and Component API Design

Define component props around the component's actual contract.

Avoid prop objects containing unrelated responsibilities.

Prefer composition over deeply coupled conditional components.

Use discriminated unions when a component supports mutually exclusive variants or modes.

Keep domain/application types separate from presentation-only types when mixing them would expose provider, persistence, or infrastructure concerns to the UI.

Do not leak raw Google Sheets/provider models into UI code.

Do not expose more data to the client than the UI actually needs.

---

## 19. Design Patterns: Use Them for a Reason

Use patterns because they solve a real architectural problem, not because the pattern name appears in a request.

Useful patterns for this stack include:

- **Adapter:** isolate Google Sheets and other provider-specific details
- **Repository/Data Access:** centralize persistence or external data access when multiple callers benefit from a stable boundary
- **Service/Use Case:** isolate meaningful domain operations that combine business rules or multiple dependencies
- **Strategy:** model interchangeable algorithms or behaviors
- **State Machine / Discriminated Union:** represent explicit finite UI or domain states
- **Composition:** keep React components flexible without inheritance or giant condition trees

Do not introduce a pattern when a small module or function is clearer.

Avoid abstraction layers that only forward arguments without adding policy, validation, reuse, isolation, or a meaningful contract.

---

## 20. File and Naming Conventions

Follow repository conventions first.

When no convention exists:

- use descriptive names
- use `handleX` for event handlers when it improves clarity
- use boolean names such as `isLoading`, `hasError`, and `canEdit`
- follow Next.js file conventions for routes and framework-reserved files

Do not mechanically rename existing files merely to enforce a generic naming preference.

---

## 21. Code Quality

Prefer readable code over clever code.

Use early returns when they improve clarity.

Avoid unnecessary nesting.

Do not apply DRY mechanically. Small local duplication can be preferable to premature abstraction when code may evolve independently.

Prefer cohesion over maximal reuse.

Keep modules focused and boundaries explicit.

Avoid hidden side effects, especially during rendering.

Do not use global mutable state unless the architecture explicitly requires it.

---

## 22. Comments and Documentation

Write comments only when they explain:

- a non-obvious invariant
- a security reason
- a framework constraint
- a performance trade-off
- a business rule that is not clear from the code

Do not add comments that merely restate the code.

Do not invent documentation for behavior that has not been verified.

---

## 23. Testing Strategy

Choose tests based on risk and architectural boundary.

Prefer the narrowest useful test:

- pure domain logic → unit test
- validation → schema/boundary test
- Google Sheets adapter → adapter/integration test where practical
- Server Action → action/authorization test
- Route Handler → request/response test
- complex UI behavior → component/integration test
- critical user flow → end-to-end test

Do not add snapshots or end-to-end tests when a smaller deterministic test provides stronger feedback.

For security-sensitive changes, cover unauthorized and invalid-input cases explicitly.

For Google Sheets parsing/mapping, cover missing cells, malformed values, and representative sheet-shape variations where those conditions are possible.

When fixing a bug, add or update a regression test when practical.

---

## 24. Verification After Changes

After modifying code, verify the change using the repository's own scripts and toolchain.

At minimum, run the narrowest applicable checks, such as:

1. type checking
2. linting
3. targeted tests
4. broader tests when warranted
5. build verification when framework/build behavior may be affected

For UI changes, verify the mobile layout and interaction behavior before considering the task complete.

For changes involving remote data, verify loading, empty, malformed, unauthorized, and failure states as applicable.

Do not bypass failing checks with `eslint-disable`, `@ts-ignore`, `any`, disabled tests, or unrelated configuration changes merely to get green output.

When a check cannot run, report the limitation instead of claiming success.

Never claim code is verified unless the relevant verification actually ran or there is clear evidence that the check is not applicable.

---

## 25. Debugging and Failure Analysis

When debugging:

1. reproduce or localize the failure
2. inspect the failing boundary and surrounding code
3. identify the root cause
4. make the smallest correct fix
5. verify the original failure is resolved
6. check for regressions in the touched area

Do not patch symptoms with arbitrary delays, retries, casts, client-side conditionals, or disabled checks unless the underlying behavior justifies them.

Do not increase timeouts or add retries without understanding whether the failure is transient, deterministic, rate-limited, or caused by incorrect lifecycle handling.

---

## 26. Performance Rules

Optimize for real user behavior, especially mobile users and unstable networks.

Prefer:

- Server Components for server-owned work
- minimal client JavaScript
- parallel data fetching for independent requests
- streaming where it materially improves perceived latency
- stable, intentional caching for shareable non-sensitive data
- pagination or incremental loading for large datasets
- appropriately sized images and media
- responsive layouts that do not require costly client calculations

Avoid:

- unnecessary `use client`
- duplicated fetching between server and client
- sequential awaits for independent requests
- client state mirroring server state without a clear purpose
- premature memoization everywhere
- large dependencies for tiny features
- loading all Google Sheets data when only a subset is needed

Do not optimize by changing cache semantics without understanding freshness and authorization requirements.

---

## 27. Mobile-First Interaction and Network Resilience

Design for mobile network conditions rather than desktop broadband assumptions.

For slow or unreliable connections:

- keep the initial client JavaScript payload as small as practical
- avoid unnecessary client-side data fetching after hydration
- prefer server-rendered content that can appear progressively
- provide meaningful loading states for slow external data
- preserve usable empty/error states when Google Sheets is unavailable
- avoid blocking the full page on a non-critical secondary request
- avoid repeated polling unless real-time requirements justify it

When an external Google Sheets request fails, fail gracefully according to the product requirement. Do not hide the failure by returning fake business data.

Prefer cached or revalidated server data for non-real-time content to reduce dependency on mobile network quality.

Do not add client-side retry loops without understanding rate limits, duplicate writes, and user expectations.

---

## 28. Dependency Discipline

Do not add a dependency for trivial functionality that the existing stack can implement safely.

Do not replace framework-native behavior with third-party libraries unless the third-party library solves a concrete problem better and its introduction is justified.

Required UI dependencies for this application are already established:

- shadcn/ui
- Lucide React
- react-countdown

Prefer them for their stated responsibilities.

Do not introduce alternative UI libraries for the same responsibility without explicit justification.

Keep dependency changes minimal and verify the package manager, scripts, lockfile, and existing dependency policy before editing dependencies.

---

## 29. What the Agent Must Not Do Automatically

Do not automatically:

- upgrade Next.js or React
- migrate package managers
- introduce a new state library
- introduce a new validation library
- introduce a new ORM
- introduce a second icon/button/carousel/countdown library
- convert Server Components to Client Components unnecessarily
- move business logic into the browser
- expose Google Sheets credentials or private data to the client
- disable lint/type checking
- weaken authentication or authorization
- change caching semantics without understanding the data requirements
- perform unrelated refactors
- rewrite large files when a local change is sufficient
- invent APIs, environment variables, routes, spreadsheet fields, provider behavior, or project conventions

---

## 30. Final Decision Checklist

Before finalizing a change, verify:

- Did I inspect the repository before choosing the implementation?
- Am I using the installed Next.js/React versions rather than assuming a version?
- Did I preserve the existing runtime, package manager, and architecture?
- Did I keep server-only logic and secrets on the server?
- Did I validate untrusted runtime input?
- Did every privileged mutation enforce server-side authorization?
- Is Google Sheets isolated behind an appropriate server-side boundary?
- Did I deliberately choose caching/revalidation based on freshness and authorization?
- Did I design the UI mobile-first?
- Are interactive controls comfortably touchable and keyboard accessible?
- Did I use shadcn/ui, Lucide React, and react-countdown for their intended responsibilities?
- Did I avoid unnecessary client state and dependencies?
- Did I avoid unnecessary client JavaScript and network requests?
- Did I handle loading, empty, malformed, and failure states where relevant?
- Did I keep the change scoped?
- Did I run the relevant verification checks?
- Did I avoid claiming success for checks that did not actually run?

---

## 31. Priority Summary

When forced to choose between competing concerns, prefer this order:

**Security → Correctness → Existing Architecture → Framework Compatibility → Mobile Accessibility/Performance → Maintainability → Developer Convenience → Style.**

The agent's goal is not to produce code that merely matches a checklist. The goal is to make the **smallest, safest, fastest, most accessible, and most maintainable change that fits the repository and the installed framework version**.
