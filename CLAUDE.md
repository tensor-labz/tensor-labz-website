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

---

## Admin Dashboard

The admin panel lives at `/admin/*` (wildcard route in `src/routes/Approutes.tsx`). It requires **Supabase Auth** — protected by `src/components/ProtectedRoute.tsx`.

### Route map

```
/admin                  → AdminOverview     (dashboard with charts)
/admin/users            → AdminUsers        (team user management)
/admin/billing          → AdminBilling      (customers & payments)
/admin/settings         → AdminSettings     (general / appearance / integrations / security)
/admin/:module          → AdminDataTable    (content CRUD table)
/admin/:module/:id      → AdminCrudForm     (edit/create record; id="new" for create)
```

> Specific routes (`users`, `billing`, `settings`) must be declared **before** the `:module` catch-all in `AdminDashboard.tsx`'s `<Routes>` block, otherwise React Router will match them as module names.

### Auth guard behaviour

`ProtectedRoute` wraps the entire `/admin/*` subtree. The guard works as follows:

1. App loads → `authSlice` initialState: `{ initialized: false, user: null }`.
2. `ProtectedRoute` renders `null` (blank) until `initialized` becomes `true`.
3. Firebase `onAuthStateChanged` fires (always, on every page load):
   - If a session exists → dispatches `setUser(user)` → `initialized = true`, `user` set.
   - If no session → dispatches `setUser(null)` → `initialized = true`, `user` stays `null`.
4. Once `initialized`, `ProtectedRoute` checks `isAuthenticated`:
   - **Authenticated** → renders children normally.
   - **Not authenticated** → `<Navigate to="/login" state={{ from: location }} replace />`.
5. Login page reads `location.state.from` and redirects back to the original URL after a successful sign-in.

> **Critical:** `setUser(null)` must set `initialized = true` (it does). Do NOT reset `initialized` to `false` anywhere — that would re-trigger the blank flash on every navigation.

### Admin file locations

```
src/pages/AdminDashboard.tsx                        ← layout shell (header + sidebar + Routes)
src/pages/Login.tsx                                 ← Firebase Auth login page
src/components/ProtectedRoute.tsx                   ← redirects to /login when unauthenticated
src/features/admin/
  config/modules.tsx                                ← MODULES array (content module definitions)
  components/AdminSidebar.tsx                       ← desktop sticky + mobile drawer nav
  components/AdminOverview.tsx                      ← dashboard with recharts (area, bar, radial)
  components/AdminDataTable.tsx                     ← 3-col table: image | title | description
  components/AdminCrudForm.tsx                      ← dynamic form driven by ModuleConfig.fields
  components/AdminUsers.tsx                         ← user management (invite, edit, remove)
  components/AdminBilling.tsx                       ← customers, MRR, revenue chart, plan pie
  components/AdminSettings.tsx                      ← general / appearance / integrations / security
```

### Module config pattern

`MODULES` in `src/features/admin/config/modules.tsx` drives the sidebar, table, and form for content pages. Each `ModuleConfig` has:

- `id` — URL segment (e.g. `'projects'`)
- `label` — display name
- `icon` — react-icons `IconType`
- `imageField?` — key of the image column shown in the table
- `titleField` — key of the primary text column
- `descriptionField?` — key of the secondary text column
- `fields[]` — array of `FieldConfig` for the CRUD form

### Field types

| Type       | Renders                                                                 |
|------------|-------------------------------------------------------------------------|
| `text`     | Plain text input                                                        |
| `textarea` | Multi-line textarea                                                     |
| `richtext` | Textarea with HTML preview toggle                                       |
| `url`      | URL input (for non-image links e.g. video embed URLs)                  |
| `image`    | Tab toggle: **Upload File** (drag & drop) or **S3 / URL** with preview |
| `images`   | Multi-image gallery: grid of previews, add via drag & drop or URL, remove individual, stores `string[]` |
| `toggle`   | Animated switch (stores `true`/`false`)                                 |
| `tags`     | Comma-separated text input                                              |

> Use `type: 'image'` for all image fields. Use `type: 'url'` only for non-image URLs (e.g. `vedio_demo`).

### Charting library

`recharts` is installed. All chart containers need an **explicit pixel height** on their wrapper div — do **not** use `height="100%"` in `ResponsiveContainer` with a flex-based parent, as Recharts cannot resolve percentage heights and will log a `-1` dimension warning. Use `className="h-[220px]"` (or similar) on the wrapper div instead.

### CRUD backend

All CRUD operations are currently **UI-only with mock data**. Backend is **not yet implemented** — deferred by design.

#### Decided architecture

| Layer | Technology | Status |
|---|---|---|
| Auth | Supabase Auth | ✅ Live |
| Database / CRUD | **Supabase** (PostgreSQL) | ✅ Live |
| Image / file storage | **AWS S3 via Lambda** | ✅ Live |
| Public CMS (read-only) | Google Sheets via `VITE_SHEET_URL` | ✅ Live |

#### Why Supabase (not Firestore)

The project deliberately chose **Supabase** for the admin backend instead of Firestore:
- Relational PostgreSQL — better for structured content with foreign keys (e.g. projects → services)
- Built-in Row Level Security (RLS) for per-role access control
- REST and realtime APIs without a separate SDK install (uses `@supabase/supabase-js`)

#### Why AWS S3 for images

Images uploaded in the admin form (`type: 'image'` fields) will be stored in S3:
- Separate from the database — keeps Supabase rows small (store URL string only)
- CloudFront CDN can sit in front of the bucket for fast global delivery
- Bucket name and region are already in the Settings page UI (`AdminSettings.tsx`)

#### What to do when implementing

**Supabase CRUD:**
1. Install: `npm install @supabase/supabase-js`
2. Create `src/lib/supabase.ts` — initialise client with `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
3. Create a Redux async thunk per module (or a generic one that takes `moduleId` as a param)
4. Replace `MOCK_DATA` in `AdminDataTable.tsx` with a `useEffect` that calls `supabase.from(moduleId).select()`
5. Replace `handleSave` in `AdminCrudForm.tsx` with `supabase.from(moduleId).upsert(values)`
6. Replace `handleDelete` with `supabase.from(moduleId).delete().eq('id', id)`
7. Table names in Supabase should match `ModuleConfig.id`: `hero`, `services`, `projects`, `about`, `contact`, `social`

**AWS S3 image upload (`ImageField`):**

The Lambda is **deployed and live** at `../tensor-labz-image-lambda/` (separate repo — `ThanuMahee12/tensor-labz-image-lambda`, private).

| Resource | Value |
|---|---|
| Lambda function | `tensor-labz-image-handler` (eu-north-1) |
| API Gateway | HTTP API `ewf03ybvmc` |
| **Base URL** | `https://ewf03ybvmc.execute-api.eu-north-1.amazonaws.com` |
| IAM role | `tensor-labz-lambda-exec` |

> ⚠️ **Firebase credentials not yet set.** Lambda is deployed but env vars `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` are placeholders — all requests will return 401 until you fill these in the Lambda console under Configuration → Environment variables.

Bucket: `tensor-labz-store` (eu-north-1). Folder structure:
- `Home/Hero/` — hero slide images
- `Insights/` — service / insight images
- `projects/{slug}/` — project images (cover + extraImages)

Pass the correct `folder` when calling upload endpoints (e.g. `"Home/Hero"`, `"Insights"`, `"projects/my-project-slug"`).

Endpoints:
- `POST /image/upload-url` — new image → `{ filename, contentType, folder }` → `{ uploadUrl, publicUrl, key }`
- `POST /image/replace` — swap image → `{ oldKey, filename, contentType, folder }` → `{ uploadUrl, publicUrl, key }`
- `DELETE /image` — remove image(s) → `{ keys: string[] }` → `{ deleted: number }`

Frontend wiring steps:
1. On file select in `ImageField`, call `POST /image/upload-url` with Firebase ID token in `Authorization` header
2. PUT the file directly to `uploadUrl` (browser → S3, Lambda not involved in transfer)
3. Store `publicUrl` as the field value (replaces the temporary `createObjectURL`)
4. On record delete, call `DELETE /image` with all image keys for that record (including `extraImages` array)
5. On image replace, call `POST /image/replace` with `oldKey` to clean up stale S3 objects

Redeploy Lambda after code changes:
```bash
cd ../tensor-labz-image-lambda
npm run build:zip
aws --profile tensor lambda update-function-code \
  --region eu-north-1 \
  --function-name tensor-labz-image-handler \
  --zip-file fileb://function.zip
```

Lambda IAM role `tensor-labz-lambda-exec` already has `s3:PutObject` and `s3:DeleteObject` on `arn:aws:s3:::tensor-labz-store/*`.

**Environment variables to add to `.env`:**
```
VITE_IMAGE_LAMBDA_URL=https://ewf03ybvmc.execute-api.eu-north-1.amazonaws.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_S3_BUCKET=tensor-labz-store
VITE_S3_REGION=eu-north-1
VITE_CDN_URL=https://cdn.tensorlabz.com
```

> Do NOT use `VITE_AWS_ACCESS_KEY` or `VITE_AWS_SECRET` — AWS credentials must never be in the frontend bundle. Use pre-signed URLs via a Supabase Edge Function instead.

---

## Google Sheets API — Sheet Names

The public site uses Google Sheets as a headless CMS via `VITE_SHEET_URL`. Exact sheet tab names (case-sensitive):

| Data          | Sheet name    | Notes                        |
|---------------|---------------|------------------------------|
| Hero slides   | `HeroData`    |                              |
| Services      | `ServiceData` |                              |
| Projects      | `ProjectData` |                              |
| About Us      | `AboutusData` | ⚠️ NOT `AboutData`           |
| Contact       | `ContactData` |                              |
| Social links  | `LinkData`    | ⚠️ nested format — see below |
| Latest news   | `LatestData`  |                              |

> **`LinkData` is special:** returns `{ data: { social_media: [...] } }` — `result.data` is an object, not an array. Do NOT use `sheetsClient` for this sheet — fetch directly and access `result.data.social_media`.

## Sheet Field Names

Key field names returned by the API (do not rename in TypeScript interfaces):

- Hero slides: `img` (not `imageURL`), `title`
- Services: `show_in_home` (`'true'` or `'1'` to appear on home page), `slug`
- Projects: `is_top` (boolean), `slug`, `extraImages`
- About: `components` (title), `value` (description)
- Contact: `contact`, `title`, `value`

---

## Deployment

### Branch strategy

```
dev  →  staging  →  main
         ↓              ↓
      Firebase      AWS Amplify
      (staging)     (production)
```

- All dev work happens on `dev`.
- Merge `dev` → `staging` to deploy to Firebase Hosting for QA/UAT.
- Merge `staging` → `main` to release on AWS Amplify (production). Amplify triggers automatically — do not deploy manually.

---

### Firebase Hosting (staging)

| Item              | Value                                                                  |
|-------------------|------------------------------------------------------------------------|
| **Staging URL**   | https://tensor-labz-website.web.app                                    |
| **Project ID**    | `tensor-labz-website`                                                  |
| **Console**       | https://console.firebase.google.com/project/tensor-labz-website        |
| **CLI location**  | `~/.npm-global/bin/firebase`                                           |
| **Config files**  | `firebase.json`, `.firebaserc`                                         |

#### Setup (first time on a new machine)

```bash
# 1. Install firebase-tools without sudo
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
npm install -g firebase-tools

# 2. Login (use --no-localhost on headless servers)
firebase login --no-localhost

# 3. Verify project
firebase projects:list
```

#### Deploy commands

```bash
# Recommended — build + deploy in one step
npm run deploy:staging

# Manual steps
npm run build
firebase deploy --only hosting

# Deploy to a specific site (if multiple sites in project)
firebase deploy --only hosting:tensor-labz-website
```

#### `firebase.json` summary

- **public dir:** `dist`
- **SPA rewrite:** all routes → `/index.html` (required for React Router)
- **Cache headers:**
  - JS/CSS/fonts: `max-age=31536000, immutable` (1 year — content-hashed filenames)
  - Images: `max-age=86400` (1 day)
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`

#### `.firebaserc` aliases

```json
{
  "projects": {
    "default": "tensor-labz-website",
    "staging":  "tensor-labz-website",
    "production": "tensor-labz-website"
  }
}
```

> Both staging and production point to the same Firebase project. Environments are separated by branch, not by Firebase project.

---

### AWS Amplify (production)

| Item              | Value                                 |
|-------------------|---------------------------------------|
| **Trigger branch**| `main`                                |
| **Deploy method** | Automatic on push — do NOT deploy manually |

---

### npm scripts

| Script                | Command                                     |
|-----------------------|---------------------------------------------|
| `npm run dev`         | Start Vite dev server                       |
| `npm run build`       | `tsc -b && vite build` → outputs to `dist/` |
| `npm run preview`     | Serve `dist/` locally for testing           |
| `npm run deploy:staging` | `npm run build && firebase deploy --only hosting` |

---

### Last deployed

- **Date:** 2026-05-07
- **Firebase CLI version:** 15.17.0
- **Files deployed:** 12 files to `dist/`
- **Hosting URL:** https://tensor-labz-website.web.app
- **Changes in last deploy:** Fixed auth guard redirect — unauthenticated admin URLs now correctly redirect to `/login` with return URL preserved.

---

## Security

- `dangerouslySetInnerHTML` must always be wrapped with `DOMPurify.sanitize(...)`.
- API URLs and secrets belong in `.env` as `VITE_` prefixed variables, accessed via `import.meta.env.VITE_*`.
- Admin routes are protected by Supabase Auth via `ProtectedRoute` — never remove this wrapper.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values before running the project locally:

```bash
cp .env.example .env
```

Key variables:

| Variable                | Purpose                                         |
|-------------------------|-------------------------------------------------|
| `VITE_SHEET_URL`        | Google Sheets API base URL (headless CMS)       |
| `VITE_SUPABASE_URL`     | Supabase project URL                            |
| `VITE_SUPABASE_ANON_KEY`| Supabase public anon key                        |
| `VITE_IMAGE_LAMBDA_URL` | Lambda API Gateway base URL (image upload)      |
| `VITE_S3_BUCKET`        | S3 bucket name (`tensor-labz-store`)            |
| `VITE_S3_REGION`        | S3 region (`eu-north-1`)                        |
| `VITE_CDN_URL`          | CDN base URL for stored images                  |
| `VITE_FIREBASE_*`       | Firebase project config (kept for other uses)   |
