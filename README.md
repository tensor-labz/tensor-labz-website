# Tensor Labs Website

Official website for **Tensor Labs** — Engineering & Technology Solutions.

Built with React 18, TypeScript, Vite, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Animations | Motion (motion/react) |
| Routing | React Router v7 |
| Icons | React Icons |
| SEO | React Helmet |
| Data | Google Sheets API (via Apps Script) |

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

Copy the example env file and fill in your Google Sheets script URL:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_SHEET_URL` | Google Apps Script web app URL (ends with `?sheetName=`) |

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
├── pages/              # Route-level page components
├── components/
│   ├── layout/         # Header, Footer, NavBar, MobileNavigation
│   ├── Page/           # Page-specific sections (Home, Service, Project, etc.)
│   ├── resuable/       # Shared wrapper components (Page, Section)
│   └── PlaceHolders/   # Loading states and ErrorBoundary
├── contexts/
│   ├── Api/            # Data contexts (AppContext, ServiceApiContext, etc.)
│   ├── DeviceContext   # Responsive breakpoint detection
│   ├── HeroContext     # Hero slider state
│   └── ServiceContext  # Active service tab state
├── data/               # Static config (nav, services, app meta)
├── base/               # Custom hooks, TypeScript types, utilities
├── routes/             # AppRoutes component
├── styles/             # Global CSS
└── assets/             # Images organized by page
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about-us` | About Us |
| `/contact-us` | Contact Us |
| `/services/:slug` | Services (dynamic) |
| `/project/:slug` | Project detail (dynamic) |

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
