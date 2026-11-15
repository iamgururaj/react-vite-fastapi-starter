# Frontend

- Use shared shadcn/ui components from `src/common/components/ui/` for all UI controls (buttons, inputs, selects, dialogs, tables, etc.).
- Add missing components to the shared directory.
- Avoid native UI controls unless explicitly requested.
- Use semantic HTML for page structure; native elements inside shared components are allowed.

Follow root AGENTS.md. Use the pnpm workspace; keep npm-compatible workspace declarations in sync. Keep feature UI/hooks in src/modules/<module>/ and reusable components/API utilities in src/common/. TanStack Router uses thin file-based routes in src/routes/ and src/router.tsx imports the generated route tree. Keep page components in their modules. Never edit src/routeTree.gen.ts; use routes:generate or the Vite plugin. Build/typecheck must generate routes first; TanStack Query owns remote state. Use Biome with the repository configuration for formatting/linting. Use shadcn base-nova components backed by @base-ui/react; do not add Radix primitives. Use tsc for type checking. Public configuration uses VITE_ variables. Preserve accessible loading, error and keyboard interaction. No tests unless requested.
