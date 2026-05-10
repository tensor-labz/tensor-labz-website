# CLAUDE.md — AI Assistant Guidelines for This Project

This file configures how Claude Code behaves when working in this repository.

---

## Commit Rules

- **Never add `Co-Authored-By` lines to commits.** Do not append any `Co-Authored-By: Claude ...` or `noreply@anthropic.com` attribution to commit messages.
- **Never mention Claude in PR descriptions.** Do not add `🤖 Generated with Claude Code` footers or any AI attribution to pull request titles, bodies, or comments.
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

- **All backend logic must go through Redux — never call Supabase, fetch, or any API directly from a UI component.** Data fetching belongs in `createAsyncThunk` inside a slice; mutations belong in thunks dispatched from controller hooks. UI components are read-only consumers of the store.
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
3. Supabase `onAuthStateChange` fires (always, on every page load):
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
src/pages/Login.tsx                                 ← Supabase Auth login page
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

| Type         | Renders                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `text`       | Plain text input                                                                                        |
| `textarea`   | Multi-line textarea                                                                                     |
| `richtext`   | Rich-text editor (`react-quill-new`) with HTML output                                                   |
| `url`        | URL input (for non-image links e.g. video embed URLs)                                                   |
| `image`      | Tab toggle: **Upload File** (drag & drop) or **S3 / URL** with preview                                  |
| `images`     | Multi-image gallery: grid of previews, add via drag & drop or URL, remove individual, stores `string[]` |
| `toggle`     | Animated switch (stores `true`/`false`)                                                                 |
| `checkbox`   | Boolean checkbox (stores `true`/`false`)                                                                |
| `tags`       | Comma-separated tag input (stores `string[]`)                                                           |
| `multiinput` | Repeating group of sub-fields (stores array of objects)                                                 |
| `radio`      | Radio button group (mutually exclusive options)                                                         |
| `select`     | Dropdown select (single value from a defined option list)                                               |

> Use `type: 'image'` for all image fields. Use `type: 'url'` only for non-image URLs (e.g. `vedio_demo`).

### Charting library

`recharts` is installed. All chart containers need an **explicit pixel height** on their wrapper div — do **not** use `height="100%"` in `ResponsiveContainer` with a flex-based parent, as Recharts cannot resolve percentage heights and will log a `-1` dimension warning. Use `className="h-[220px]"` (or similar) on the wrapper div instead.

### CRUD backend

All backend layers are **live**. Supabase handles auth + database, Lambda/S3 handles image storage.

#### Architecture

| Layer                  | Technology                         | Status  |
| ---------------------- | ---------------------------------- | ------- |
| Auth                   | Supabase Auth                      | ✅ Live |
| Database / CRUD        | **Supabase** (PostgreSQL)          | ✅ Live |
| Image / file storage   | **AWS S3 via Lambda**              | ✅ Live |
| Public CMS (read-only) | Google Sheets via `VITE_SHEET_URL` | ✅ Live |

Table names in Supabase match `ModuleConfig.id`: `hero`, `services`, `projects`, `about`, `contact`, `social`.

Dynamic form/table layout is stored per-module in Supabase JSONB tables (`form_config`, `table_config`) and falls back to the static `fields[]` in `MODULES` config when the row is absent.

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

#### AWS S3 image upload (`ImageField`)

Lambda is **deployed and live** at `../tensor-labz-image-lambda/` (separate repo — `tensor-labz/tensor-labz-image-lambda`, private).

| Resource        | Value                                                     |
| --------------- | --------------------------------------------------------- |
| Lambda function | `tensor-labz-image-handler` (eu-north-1)                  |
| API Gateway     | HTTP API `ewf03ybvmc`                                     |
| **Base URL**    | `https://ewf03ybvmc.execute-api.eu-north-1.amazonaws.com` |
| IAM role        | `tensor-labz-lambda-exec`                                 |

> Lambda validates requests using **Supabase JWT** (`SUPABASE_JWT_SECRET` env var in Lambda). Auth token from `supabase.auth.getSession()` is passed as the `Authorization: Bearer <token>` header. No Firebase credentials involved.

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

1. On file select in `ImageField`, call `POST /image/upload-url` with the Supabase session JWT in `Authorization: Bearer <token>` header
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

## Google Maps Embed URL

The Contact Us page and footer can display a Google Maps embed. The embed URL is stored in the `contact` table — row with `contact = 'address'`, column `link`.

### How to get the embed URL

1. Open [Google Maps](https://maps.google.com) and search for the location
2. Click **Share** → **Embed a map** tab
3. Copy only the URL inside `src="..."` — example:
   ```
   https://www.google.com/maps/embed?pb=!1m17!1m12...
   ```
4. Paste that URL into the `link` column of the address row:
   ```sql
   UPDATE contact
   SET link = 'https://www.google.com/maps/embed?pb=...'
   WHERE contact = 'address';
   ```
5. Or update it via the admin panel: **Site Control → Contact Details → edit the Address row → Link field**

### How it works in code

- `contactHref(row)` in `Footer.tsx` checks `row.link` first — if set, uses it directly
- `deriveLink()` in `AdminSiteControl.tsx` auto-generates a Google Maps search URL for address rows when no explicit link is provided
- To display as an iframe embed (e.g. on Contact Us page), check if the link contains `maps/embed` and render `<iframe src={row.link} />`

---

## Direct S3 Upload (Budget / CLI)

Use this when the Lambda image upload is not available or to save on Lambda invocation costs. Requires the `tensor` AWS CLI profile configured locally.

### Upload a single file

```bash
aws --profile tensor s3 cp <local-file> s3://tensor-labz-store/<folder>/<filename> \
  --acl public-read \
  --content-type image/png
```

Example — upload the logo:
```bash
aws --profile tensor s3 cp src/assets/images/logo.png \
  s3://tensor-labz-store/assets/upload/logo.png \
  --acl public-read \
  --content-type image/png
```

### Get the public URL

After upload the public URL is always:
```
https://tensor-labz-store.s3.eu-north-1.amazonaws.com/<folder>/<filename>
```

Example:
```
https://tensor-labz-store.s3.eu-north-1.amazonaws.com/assets/upload/logo.png
```

### Upload a folder

```bash
aws --profile tensor s3 sync ./dist/assets \
  s3://tensor-labz-store/assets/ \
  --acl public-read
```

### When to use CLI vs Lambda

| Situation | Use |
| --------- | --- |
| Admin panel image upload (users) | Lambda (pre-signed URL) |
| One-off assets (logo, static files) | AWS CLI |
| Batch upload / migration | AWS CLI |
| Budget-sensitive / Lambda cold-start concerns | AWS CLI |

> The bucket `tensor-labz-store` is in `eu-north-1`. Always use `--profile tensor` to authenticate with the correct IAM credentials.

---

## Documentation Repo

Developer docs live in a **separate dedicated repo** — `tensor-labz/tensor-labz-docs` (not in this repo).

| Item          | Value                                              |
| ------------- | -------------------------------------------------- |
| **Repo**      | https://github.com/tensor-labz/tensor-labz-docs   |
| **Docs site** | https://tensor-labz.github.io/tensor-labz-docs/   |
| **Tool**      | MkDocs Material + GitHub Actions (auto-deploy on push to `main`) |
| **Local**     | `cd ../tensor-labz-docs && mkdocs serve`           |

> Do **not** add `docs/`, `mkdocs.yml`, or a docs workflow to this repo — they were removed and live in `tensor-labz-docs` only.

---

## Google Sheets API — Sheet Names

The public site uses Google Sheets as a headless CMS via `VITE_SHEET_URL`. Exact sheet tab names (case-sensitive):

| Data         | Sheet name    | Notes                        |
| ------------ | ------------- | ---------------------------- |
| Hero slides  | `HeroData`    |                              |
| Services     | `ServiceData` |                              |
| Projects     | `ProjectData` |                              |
| About Us     | `AboutusData` | ⚠️ NOT `AboutData`           |
| Contact      | `ContactData` |                              |
| Social links | `LinkData`    | ⚠️ nested format — see below |
| Latest news  | `LatestData`  |                              |

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

| Item             | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| **Staging URL**  | https://tensor-labz-website.web.app                             |
| **Project ID**   | `tensor-labz-website`                                           |
| **Console**      | https://console.firebase.google.com/project/tensor-labz-website |
| **CLI location** | `~/.npm-global/bin/firebase`                                    |
| **Config files** | `firebase.json`, `.firebaserc`                                  |

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
    "staging": "tensor-labz-website",
    "production": "tensor-labz-website"
  }
}
```

> Both staging and production point to the same Firebase project. Environments are separated by branch, not by Firebase project.

---

### AWS Amplify (production)

| Item               | Value                                      |
| ------------------ | ------------------------------------------ |
| **Trigger branch** | `main`                                     |
| **Deploy method**  | Automatic on push — do NOT deploy manually |

---

### npm scripts

| Script                   | Command                                           |
| ------------------------ | ------------------------------------------------- |
| `npm run dev`            | Start Vite dev server                             |
| `npm run build`          | `tsc -b && vite build` → outputs to `dist/`       |
| `npm run preview`        | Serve `dist/` locally for testing                 |
| `npm run deploy:staging` | `npm run build && firebase deploy --only hosting` |

---

### Last deployed

- **Date:** 2026-05-09
- **Firebase CLI version:** 15.17.0
- **Hosting URL:** https://tensor-labz-website.web.app
- **Changes in last deploy:** Live Supabase CRUD across all admin modules; AdminOverview live stats; S3 cleanup on record delete; Lambda CORS updated for all allowed origins; docs moved to dedicated `tensor-labz-docs` repo.

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

| Variable                 | Purpose                                       |
| ------------------------ | --------------------------------------------- |
| `VITE_SHEET_URL`         | Google Sheets API base URL (headless CMS)     |
| `VITE_SUPABASE_URL`      | Supabase project URL                          |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key                      |
| `VITE_IMAGE_LAMBDA_URL`  | Lambda API Gateway base URL (image upload)    |
| `VITE_S3_BUCKET`         | S3 bucket name (`tensor-labz-store`)          |
| `VITE_S3_REGION`         | S3 region (`eu-north-1`)                      |
| `VITE_CDN_URL`           | CDN base URL for stored images                |
| `VITE_FIREBASE_*`        | Firebase project config (staging hosting only — not used for auth) |
