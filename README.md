# Tensor Labs Website

Official website for **Tensor Labs** — Engineering & Technology Solutions.

A React 18 + TypeScript single-page app (public marketing site + protected admin
CMS) built with Vite and Tailwind, with a Three.js animated background.

---

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | React 18 + TypeScript 5                                  |
| Build tool | Vite 6                                                   |
| Styling    | Tailwind CSS 3                                           |
| Animations | Motion (`motion/react`)                                  |
| 3D         | Three.js (global background)                             |
| Routing    | React Router v7                                          |
| State      | Redux Toolkit                                            |
| Icons      | React Icons (lazy `ReactIcon` loader)                    |
| SEO        | React Helmet Async                                       |
| Auth + DB  | Firebase (Firebase Auth + Firestore)                     |
| Images     | AWS S3 via Lambda (pre-signed URLs, Firebase-token auth) |
| Charts     | Recharts (admin dashboard)                               |

> The backend is being migrated from Supabase to Firebase; some modules may
> still reference Supabase during the transition (its env vars remain for now).

---

## Getting Started

### Prerequisites

- Node.js **20+** (see `engines` in `package.json`)
- npm
- Access to the private submodules (`docs`, `image-lambda`) is **not** required
  to build the app — they are reference-only.

### Install

```bash
git clone git@github.com:tensor-labz/tensor-labz-website.git
cd tensor-labz-website
npm install
```

### Environment variables

Copy the example and fill in your values (never commit `.env`):

```bash
cp .env.example .env
```

| Variable                                             | Description                                           |
| ---------------------------------------------------- | ----------------------------------------------------- |
| `VITE_FIREBASE_*`                                    | Firebase web config (Auth, Firestore, Analytics)      |
| `VITE_FIREBASE_MEASUREMENT_ID`                       | Firebase Analytics measurement id (optional)          |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`       | Supabase project URL + anon key (legacy, phasing out) |
| `VITE_IMAGE_LAMBDA_URL`                              | Image-upload Lambda API Gateway base URL              |
| `VITE_S3_BUCKET` / `VITE_S3_REGION` / `VITE_CDN_URL` | S3 bucket / region / CDN for stored images            |

---

## Scripts

| Command                  | Description                                  |
| ------------------------ | -------------------------------------------- |
| `npm run dev`            | Start the Vite dev server                    |
| `npm run build`          | Type-check (`tsc -b`) + production build     |
| `npm run preview`        | Serve the production build locally           |
| `npm run typecheck`      | Type-check only (`tsc -b`)                   |
| `npm run lint`           | ESLint                                       |
| `npm run lint:fix`       | ESLint with autofix                          |
| `npm run format`         | Prettier write                               |
| `npm run format:check`   | Prettier check (CI-safe)                     |
| `npm run deploy:staging` | Build + deploy to Firebase Hosting (staging) |

---

## Project Structure

```
src/
├── app/                # configureStore, AppProviders, typed hooks
├── pages/              # Route-level pages (Home, Services, Posts, Project, Login, Admin…)
├── features/{name}/    # Feature-colocated: components/ (pure UI) + hooks/ (controllers)
├── shared/
│   ├── components/ui/     # Reusable UI — ContentPage/Card/List/Pagination, ReactIcon, MediaGallery…
│   ├── components/layout/ # Header, Footer, NavBar, MobileNavigation, ContentHeader
│   ├── hooks/             # useTheme, useDevice, useSiteSettings…
│   └── types/ utils/      # shared types and helpers
├── store/              # Redux slices (createSlice + createAsyncThunk)
├── services/           # Data layer; Firestore repos under services/firebase/
├── lib/                # firebase + supabase clients, image upload, motion presets
├── routes/             # AppRoutes
├── styles/             # Global CSS + Tailwind layers
└── assets/             # Images
```

All backend access goes through Redux (thunks in `store/` → `services/`); UI
components are read-only consumers. Use the `@` alias for `src` (`@/shared/...`).

---

## Pages

| Route             | Page                           |
| ----------------- | ------------------------------ |
| `/`               | Home                           |
| `/about-us`       | About Us                       |
| `/contact-us`     | Contact Us                     |
| `/services`       | Services — all projects        |
| `/services/:slug` | Services — filtered by service |
| `/project/:slug`  | Project detail (dynamic)       |
| `/posts`          | Posts & articles               |
| `/posts/:slug`    | Post detail (dynamic)          |
| `/login`          | Admin login (Firebase Auth)    |
| `/admin/*`        | Admin dashboard (protected)    |

---

## Deployment

```
feature/fix branch  →  staging  →  main
                          │            │
                     Firebase      AWS Amplify
                     Hosting       (production)
                     (staging/UAT) (auto-deploy on push)
```

- Branch off `staging`; open a PR into `staging` (enforced by `enforce-flow.yml`).
- `staging` auto-deploys to Firebase Hosting for review.
- Merge `staging → main` to release; Amplify builds `main` automatically.
- Releases are tagged from Conventional Commits (`release.yml`); see `CHANGELOG.md`.

### Submodules

`docs/` and `image-lambda/` are vendored as git submodules (reference only — each
builds/deploys from its own repo). Dependabot keeps their pins current via weekly
PRs into `staging` (`.github/dependabot.yml`).

---

## Contributing

1. Branch off `staging` (never directly off `main`).
2. Commit convention: `type: description` (e.g. `fix:`, `feat:`, `chore:`, `refactor:`).
3. Do not commit `.env` files.
4. Ensure `npm run typecheck`, `npm run lint`, and `npm run build` pass.
5. Open a PR targeting `staging`.
