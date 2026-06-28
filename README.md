# Tensor Labs Website

Official website for **Tensor Labs** — Engineering & Technology Solutions.

Built with React 18, TypeScript, Vite, and Tailwind CSS.

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | React 18 + TypeScript 5             |
| Build tool | Vite 6                              |
| Styling    | Tailwind CSS 3                      |
| Animations | Motion (motion/react)               |
| Routing    | React Router v7                     |
| State      | Redux Toolkit                       |
| Icons      | React Icons                         |
| SEO        | React Helmet                        |
| Data       | Supabase (Postgres + Auth); Google Sheets (legacy CMS) |
| Images     | AWS S3 via Lambda (pre-signed URLs) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

| Variable                                          | Description                                  |
| ------------------------------------------------- | -------------------------------------------- |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`    | Supabase project URL + public anon key       |
| `VITE_FIREBASE_*`                                 | Firebase web config (staging hosting/analytics) |
| `VITE_IMAGE_LAMBDA_URL`                           | Image-upload Lambda API Gateway base URL     |
| `VITE_S3_BUCKET` / `VITE_S3_REGION` / `VITE_CDN_URL` | S3 bucket / region / CDN for stored images |
| `VITE_SHEET_URL`                                  | Google Apps Script CMS URL (optional — Latest news only) |

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── app/                # configureStore, AppProviders, typed hooks
├── pages/              # Route-level pages (Home, Services, Posts, Project, Login, Admin…)
├── features/{name}/    # Feature-colocated: components/ (pure UI) + hooks/ (controllers)
├── shared/
│   ├── components/ui/     # Reusable UI — ContentPage, ContentCard, ContentList,
│   │                      #   ContentPagination, ReactIcon, Card, Section…
│   ├── components/layout/ # Header, Footer, NavBar, MobileNavigation, ContentHeader
│   ├── hooks/             # useTheme, useDevice, useSiteSettings…
│   └── types/ utils/      # shared types and helpers
├── store/              # Redux slices (createSlice + createAsyncThunk)
├── services/           # Data-fetch layer (Supabase / Sheets)
├── lib/                # supabase client, motion presets, helpers
├── components/         # resuable Page wrapper, ProtectedRoute, placeholders
├── routes/             # AppRoutes
├── data/               # Static config (nav, etc.)
├── styles/             # Global CSS + Tailwind layers
└── assets/             # Images
```

---

## Pages

| Route                  | Page                            |
| ---------------------- | ------------------------------- |
| `/`                    | Home                            |
| `/about-us`            | About Us                        |
| `/contact-us`          | Contact Us                      |
| `/services`            | Services — all projects         |
| `/services/:slug`      | Services — filtered by service  |
| `/project/:slug`       | Project detail (dynamic)        |
| `/posts`               | Posts & articles                |
| `/posts/:slug`         | Post detail (dynamic)           |
| `/login`               | Admin login (Supabase Auth)     |
| `/admin/*`             | Admin dashboard (protected)     |

---

## Branch Strategy

```
main          ← production
└── staging   ← pre-production review
    └── fix/* / feat/* / style/*  ← feature/fix branches
```

---

## Contributing

1. Branch off `staging` (never directly off `main`)
2. Follow commit convention: `type: description` (e.g. `fix:`, `feat:`, `style:`)
3. Do not commit `.env` files
4. Open a PR targeting `staging`
