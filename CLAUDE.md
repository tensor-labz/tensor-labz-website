# CLAUDE.md — AI Assistant Guidelines for This Project

This file configures how Claude Code behaves when working in this repository.

---

## Commit Rules

- **Never add `Co-Authored-By` lines to commits.** Do not append any `Co-Authored-By: Claude ...` or `noreply@anthropic.com` attribution to commit messages.
- Keep commit messages concise and follow the existing convention: `type: short description` (e.g. `fix:`, `feat:`, `refactor:`, `style:`, `security:`).
- Never commit `.env` files — they contain credentials. Only `.env.example` should be committed.
- GPG signing may fail on this server — use `git -c commit.gpgsign=false commit` if needed.

## Code Style

- TypeScript with strict mode — avoid `any` types.
- All animation imports must use `motion/react`, not `framer-motion`.
- Equality checks must use `===`, never `==`.
- No `console.log` debug statements in production code.

## Architecture

State management is **Redux Toolkit** (not Context API). The old `src/contexts/` layer still exists but is being phased out — do not add new context providers.

### Feature-colocated structure

```
src/features/{feature-name}/
  hooks/use{Feature}Controller.ts   ← dispatches thunks, returns data for UI
  components/                       ← pure UI components, read from Redux
src/store/{name}Slice.ts            ← createSlice + createAsyncThunk
src/services/{name}Service.ts       ← pure fetch via sheetsClient
src/shared/                         ← reusable components, hooks, types, utils
src/app/store.ts                    ← configureStore
src/app/providers.tsx               ← AppProviders wrapper
src/app/hooks.ts                    ← useAppSelector / useAppDispatch
```

### Rules

- Controller hooks dispatch thunks only when `status === 'idle'`.
- Selectors that return arrays or objects **must** use `createSelector` to avoid unnecessary re-renders.
- All `useEffect` fetch calls outside Redux must have an `AbortController` with `return () => controller.abort()`.
- Navigation must use `useNavigate` from `react-router-dom`, never `window.location.href`.
- Use `useAppSelector` / `useAppDispatch` typed hooks — never raw `useSelector` / `useDispatch`.

## Google Sheets API — Sheet Names

The backend is Google Sheets via `VITE_SHEET_URL`. Exact sheet tab names (case-sensitive):

| Data          | Sheet name    |
|---------------|---------------|
| Hero slides   | `HeroData`    |
| Services      | `ServiceData` |
| Projects      | `ProjectData` |
| About Us      | `AboutusData` |
| Contact       | `ContactData` |
| Social links  | `LinkData`    | ⚠️ nested — see below |
| Latest news   | `LatestData`  |

> **Common mistake:** `AboutData` is wrong — it must be `AboutusData`.

> **`LinkData` is special:** it returns `{ data: { social_media: [...] } }` — `result.data` is an object, not an array. Do NOT use `sheetsClient` for this sheet — fetch directly and access `result.data.social_media`.

## Sheet Field Names

Key field names returned by the API (do not rename in TypeScript interfaces):

- Hero slides: `img` (not `imageURL`), `title`
- Services: `show_in_home` (`'true'` or `'1'` to appear on home page), `slug`
- Projects: `is_top` (boolean), `slug`, `extraImages`
- About: `components` (title), `value` (description)
- Contact: `contact`, `title`, `value`

## Deployment

### Branch strategy

```
dev  →  staging  →  main
         ↓              ↓
      Firebase      AWS Amplify
      (staging)     (production)
```

- All dev work happens on `dev`.
- Merge `dev` → `staging` to deploy to Firebase for QA.
- Merge `staging` → `main` to release on AWS Amplify (production).

### Firebase (staging)

firebase-tools is installed at `~/.npm-global/bin/firebase` — run `source ~/.bashrc` to get it on PATH.

```bash
# One-command build + deploy to staging
npm run deploy:staging

# Or manually
npm run build
firebase deploy --only hosting
```

Staging URL: **https://tensor-labz-website.web.app**

### AWS Amplify (production)

Triggered automatically on merge to `main`. Do not manually deploy to production.

## Security

- `dangerouslySetInnerHTML` must always be wrapped with `DOMPurify.sanitize(...)`.
- API URLs and secrets belong in `.env` as `VITE_` prefixed variables, accessed via `import.meta.env.VITE_*`.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values before running the project locally:

```bash
cp .env.example .env
```
