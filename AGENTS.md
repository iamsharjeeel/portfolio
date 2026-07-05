<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single-service **Next.js 16** static portfolio site (no backend, database, or env vars/secrets required). All content is hardcoded in `lib/` (`projects.ts`, `builds.ts`, `content.ts`).

- Dev server: `npm run dev` (Turbopack) on http://localhost:3000. Run it in a long-lived tmux session, not a blocking foreground shell.
- Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`) and `README.md` — refer to those rather than duplicating.
- Lint (`npm run lint`) currently exits 0 but reports pre-existing errors/warnings in `components/` (e.g. `ThemeProvider.tsx`, `Philosophy.tsx`, `Work.tsx`). These are unrelated to environment setup — do not "fix" them unless that is the task.
