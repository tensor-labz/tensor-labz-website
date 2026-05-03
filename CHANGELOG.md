# Changelog

All notable changes to the Tensor Labs website are documented here.

---

## [Unreleased] — fix/code-review-issues

### Security

- Patched XSS vulnerability: `dangerouslySetInnerHTML` in `Project.tsx` now sanitized with `DOMPurify`
- Moved Google Sheets API URL out of source code into `VITE_SHEET_URL` environment variable
- Added `.env` and `.env.*` to `.gitignore` to prevent credential leaks
- Added `.env.example` as a developer setup template

### Bug Fixes

- Fixed Contact Us nav link missing leading `/` — broken from nested routes like `/services/:slug`
- Added `/services` → `/services/all` redirect route (was returning blank page)
- Fixed Footer service URLs missing `/` separator (e.g. `/servicescad-modeling` → `/services/cad-modeling`)
- Fixed `loadingStages.reverse()` mutating the array in place on every interval tick
- Fixed `TabBar` active indicator invisible due to empty `bg-[]` Tailwind class
- Fixed `"Instragram"` typo in `SocialMediaLinks.tsx` that silently broke Instagram link matching
- Fixed `==` comparisons replaced with `===` in `Header.tsx` and `ServiceHero.tsx`
- Replaced `window.location.href` with `useNavigate` in `ProjectNotFound.tsx` to avoid full page reload
- Removed debug `console.log(ishome)` from `Header.tsx`
- Fixed `app_data.tsx` placeholder description, `"Tesor Labs"` author typo, and invalid relative logo URL

### Performance

- Moved `Math.random()` particle positions in `HeroSection.tsx` into `useMemo` to prevent jank on re-render
- Wrapped `useFilteredProjects` filter and slice logic in `useMemo`
- Moved `HeroContext` slide normalisation from a side-effect into the reducer
- Removed pointless 500ms debounce on initial `AppContext` data fetch
- Removed duplicate `window.resize` listener in `Pagination.tsx` — now uses `DeviceContext`
- Fixed `window.innerWidth` captured at mount in `Page.tsx` exit animation — now uses `"100vw"`

### Refactor

- Standardized all 32 `framer-motion` imports to `motion/react` (`framer-motion` was never in `package.json`)
- Added `AbortController` cleanup to all `useEffect` fetch calls (6 files) to prevent memory leaks
- Fixed `ServiceContext` navigation side effect: added missing `navigate` dependency and guard against duplicate navigation

### Accessibility

- Wrapped MobileNavigation logo `<img onClick>` in `<button>` for keyboard and screen reader support

### Added

- `ErrorBoundary` class component wrapping the entire app — prevents blank white screen on render errors

---

## Previous releases

See git log for historical changes prior to this changelog.
