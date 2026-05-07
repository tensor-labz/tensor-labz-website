# Development History — 2026-05-07

## Repository

| Item | Detail |
|---|---|
| **Repo** | `git@github.com:tensor-labz/tensor-labz-website.git` |
| **Branch pushed** | `staging` |
| **Production branch** | `main` (protected — requires PR from staging) |
| **Docs site** | https://tensor-labz.github.io/tensor-labz-website/ |
| **Staging URL** | https://tensor-labz-website.web.app |

---

## Branch Strategy

```
dev  →  staging  →  main
          ↓              ↓
      Firebase       AWS Amplify
      (staging)      (production)
```

- Work is committed locally on `main` and pushed to `staging` branch on remote.
- `staging → main` requires a pull request (main is protected, no direct pushes, no merge commits).

---

## Commits Pushed Today (2026-05-07)

| Hash | Type | Description |
|---|---|---|
| `13ca930` | docs | Fix mkdocs `site_url` and `repo_url` to `tensor-labz` org |
| `1553ee5` | docs | Add MkDocs site with Mermaid diagrams + GitHub Pages workflow |
| `85b8603` | style | White background on sort dropdown (dark mode fix) |
| `49b94dc` | feat | Add search, sort and mobile layout to AdminDataTable |
| `28e767c` | fix | Normalize Supabase column names in services and projects fetchers |
| `95efc2d` | chore | Add S3/CDN env vars to `.env.example` |
| `f7d88ec` | feat | Wire image upload to S3 via Lambda presigned URLs |
| `84a443e` | feat | Migrate admin auth from Firebase to Supabase |
| `a7b03ef` | feat | Wire admin CRUD and social context to Supabase |

---

## Major Features Completed Today

### 1. Supabase Integration
- Admin auth migrated from Firebase to Supabase JWT
- All CRUD modules (`hero`, `services`, `projects`, `about`, `contact`, `social`) reading/writing to Supabase tables
- `SocialMediaContext` refactored to fetch from Supabase instead of Google Sheets

### 2. S3 Image Upload via Lambda
- `AdminCrudForm` — `ImageField` component calls Lambda presigned URL endpoint
- Upload flow: `POST /image/upload-url` → PUT file directly to S3 → store `publicUrl` in form
- Replace flow: `POST /image/replace` (cleans up old S3 key)
- Delete flow: `DELETE /image` on record deletion
- Lambda: `tensor-labz-image-handler` · API Gateway: `ewf03ybvmc` · Region: `eu-north-1`
- Bucket: `tensor-labz-store`

### 3. Dynamic Form Config System
- 12 field types: `text`, `textarea`, `url`, `image`, `images`, `toggle`, `checkbox`, `tags`, `multiinput`, `richtext`, `radio`, `select`
- `AdminSettings` → **Forms** section: per-module field editor (add/remove/reorder fields, set key/label/type/span/required/placeholder/options)
- Config stored in Supabase `form_config` table (JSONB), falls back to static `MODULES` config
- `AdminCrudForm` loads fields dynamically from `form_config` → falls back to `modules.tsx`
- `react-quill-new` (React 18 compatible) for `richtext` fields

### 4. Dynamic Table Column Config
- `AdminSettings` → **Tables** section: column visibility, label, alignment per module
- Config stored in Supabase `table_config` table
- `AdminDataTable` reads column config on mount, applies to headers and rows

### 5. AdminDataTable UX Improvements
- Search bar (filters by title/description live)
- Sort dropdown (field + direction)
- Mobile-responsive layout
- Dark mode fix: sort dropdown uses explicit white background (`backgroundColor: '#fff', color: '#111'`)

### 6. MkDocs Documentation Site
- 17 pages across 5 sections: Architecture, Supabase, Lambda, Admin Panel, Deployment
- Mermaid diagrams: `flowchart`, `sequenceDiagram`, `erDiagram`, `gitGraph`
- GitHub Actions workflow (`.github/workflows/docs.yml`) auto-deploys on push to `main`
- Material theme, dark/light toggle, navigation tabs

---

## Files Changed

### New Files
| File | Purpose |
|---|---|
| `HISTORY.md` | This file — session changelog |
| `mkdocs.yml` | MkDocs site config |
| `.github/workflows/docs.yml` | GitHub Actions — auto-deploy docs to GitHub Pages |
| `docs/index.md` | Docs home page |
| `docs/architecture/overview.md` | System architecture + sequence diagrams |
| `docs/supabase/schema.md` | Full ER diagram of all 8 tables |
| `docs/supabase/auth.md` | Supabase auth flow diagrams |
| `docs/lambda/overview.md` | Lambda endpoints + S3 upload sequence |
| `docs/admin/overview.md` | Admin panel routes + auth guard |
| `docs/admin/table-config.md` | Dynamic table column config |
| `docs/admin/form-config.md` | Dynamic form field config |
| `docs/deployment/staging.md` | Firebase staging deploy |
| `docs/deployment/production.md` | AWS Amplify production deploy |
| `src/shared/types/tableConfig.ts` | `TableColumnConfig` / `TableConfig` interfaces |

### Modified Files
| File | Change Summary |
|---|---|
| `src/features/admin/config/modules.tsx` | Expanded `FieldConfig` type — 12 field types, added `options?: string[]` |
| `src/features/admin/components/AdminCrudForm.tsx` | Full rewrite — dynamic fields from `form_config`, all 12 field types, ReactQuill, Lambda image upload |
| `src/features/admin/components/AdminDataTable.tsx` | Dynamic column config from `table_config`, search, sort, mobile layout |
| `src/features/admin/components/AdminSettings.tsx` | Added Tables + Forms sections with full CRUD editors |
| `src/contexts/Api/SocialMediaContext.tsx` | Fetch from Supabase instead of Google Sheets |
| `.env.example` | Added `VITE_IMAGE_LAMBDA_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_S3_BUCKET`, `VITE_S3_REGION`, `VITE_CDN_URL` |
| `package.json` | Added `react-quill-new`, `docs:serve`, `docs:build` scripts |

---

## Infrastructure References

| Resource | Value |
|---|---|
| Lambda function | `tensor-labz-image-handler` (eu-north-1) |
| API Gateway | `https://ewf03ybvmc.execute-api.eu-north-1.amazonaws.com` |
| S3 Bucket | `tensor-labz-store` (eu-north-1) |
| Supabase project | `VITE_SUPABASE_URL` in `.env` |
| Firebase (staging) | `tensor-labz-website` project |
| AWS Amplify (prod) | Auto-triggered on push to `main` |

---

## Supabase SQL — Run Once

These tables need to exist in Supabase if not already created:

```sql
-- Dynamic table column config
create table if not exists table_config (
  id bigint generated always as identity primary key,
  module_id text not null unique,
  columns jsonb not null default '[]'
);
alter table table_config enable row level security;
create policy "public read" on table_config for select using (true);
create policy "admin write" on table_config for all using (auth.role() = 'authenticated');

-- Dynamic form field config
create table if not exists form_config (
  id bigint generated always as identity primary key,
  module_id text not null unique,
  fields jsonb not null default '[]'
);
alter table form_config enable row level security;
create policy "public read" on form_config for select using (true);
create policy "admin write" on form_config for all using (auth.role() = 'authenticated');
```

---

## Completed Steps (2026-05-07 end of day)

- [x] Enable GitHub Pages: repo Settings → Pages → Source: `gh-pages` branch — **done**
- [x] Run Supabase SQL for `table_config` and `form_config` tables — **done**
- [x] Merge `staging → main` via PR — **done, Amplify production deploy triggered**
- [x] MkDocs docs site deployed to `https://tensor-labz.github.io/tensor-labz-website/` — **done**
- [x] All source files pushed to `staging` branch — **done**

---

## Deferred to Tomorrow

- [ ] **Lambda auth** — Set `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` in Lambda env vars (Lambda console → Configuration → Environment variables). Until this is done, image uploads return 401.
- [ ] **End-to-end test** — Test the full admin flow: login → CRUD on each module → image upload → verify S3 URL saved in Supabase.
- [ ] **Dynamic form config test** — Open Admin Settings → Forms, configure fields for one module, save to `form_config`, verify the CRUD form updates accordingly.
- [ ] **Dynamic table config test** — Open Admin Settings → Tables, toggle column visibility and alignment, verify AdminDataTable reflects changes.
- [ ] **Review open PRs** — Check if staging → main PR is merged and Amplify production deploy completed successfully.
