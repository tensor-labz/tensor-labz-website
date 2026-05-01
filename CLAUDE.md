# CLAUDE.md — AI Assistant Guidelines for This Project

This file configures how Claude Code behaves when working in this repository.

---

## Commit Rules

- **Never add `Co-Authored-By` lines to commits.** Do not append any `Co-Authored-By: Claude ...` or `noreply@anthropic.com` attribution to commit messages.
- Keep commit messages concise and follow the existing convention: `type: short description` (e.g. `fix:`, `feat:`, `refactor:`, `style:`, `security:`).
- Never commit `.env` files — they contain credentials. Only `.env.example` should be committed.

## Code Style

- TypeScript with strict mode — avoid `any` types.
- All animation imports must use `motion/react`, not `framer-motion`.
- Equality checks must use `===`, never `==`.
- No `console.log` debug statements in production code.

## Architecture

- State management via React Context API. New data sources should be added as context providers under `src/contexts/Api/`, not fetched directly inside components.
- All `useEffect` fetch calls must have an `AbortController` with a cleanup `return () => controller.abort()`.
- Navigation must use `useNavigate` from `react-router-dom`, never `window.location.href`.

## Security

- `dangerouslySetInnerHTML` must always be wrapped with `DOMPurify.sanitize(...)`.
- API URLs and secrets belong in `.env` as `VITE_` prefixed variables, accessed via `import.meta.env.VITE_*`.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values before running the project locally:

```bash
cp .env.example .env
```
