# Changelog

All notable changes to the Tensor Labs website are documented here.

---

## [Unreleased]

---
## [v1.6.1] — 2026-05-09

### Bug Fixes

- prettier formatting, remove unused imports, escape quotes in JSX

### Other

- Merge pull request #13 from tensor-labz/staging



---
## [v1.6.0] — 2026-05-09

### Added

- dynamic company info, Site Control admin, globe Contact Us page
- image upload progress bar, prominent preview, per-file multi-image progress

### Style

- compact module page header for mobile — tighter padding, smaller button

### CI / Build

- add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to staging and production build env

### Other

- Merge pull request #12 from tensor-labz/staging
- Merge pull request #11 from tensor-labz/dev
- Merge pull request #10 from tensor-labz/feat/form-refactor



---
## [v1.5.0] — 2026-05-09

### Added

- fixed header + fixed pagination, rows scroll between them
- table-only scroll — page header and search bar always visible
- mobile card list view for xs screens; DataTable for sm+
- dynamic page components + fix table responsiveness + Add button at page level
- auto-render url-type fields as icon in table, no manual config needed
- url action column type renders external link icon
- add link template support to TableColumnConfig and CrudTable
- resolve service_id FK to label in CrudTable; add relation select in AdminCrudForm
- add service column to projects table via tableColumns config
- replace AdminDataTable with reusable CrudTable using react-data-table-component

### Bug Fixes

- pagination visible — flex layout on wrapper div not ResponsiveWrapper
- eliminate bottom gap — fill full card height, auto rows-per-page
- hide DTC scrollbar by passing className directly to DataTable
- hide DataTable scrollbar via .rdt_TableBody selector
- single scroll — DataTable owns vertical, container owns horizontal
- guard page_config fetch against 404 when table not yet created
- memoize selectors with createSelector+useMemo; wrap DataTable in StyleSheetManager to suppress styled-components DOM prop warnings
- visible url icon cell; responsive table layout with horizontal scroll
- defaultColumns includes all module fields, hidden by default
- CrudTable — case-insensitive field lookup, image thumbnails for all image-type fields, skip duplicate imageField in colConfig

### Refactor

- natural-height table with max-height cap
- rename TableColumnConfig key→field, label→title, add height field

### Style

- remove bottom padding from CrudTable — table card reaches the edge
- compact pagination bar — 40px height, smaller page buttons
- hide scrollbars on table and card list
- link cells inherit text style — no accent color or underline
- remove Edit button column from CrudTable — row click handles navigation

### Other

- Merge pull request #9 from tensor-labz/feat/crud-table



---
## [v1.4.0] — 2026-05-09

### Added

- wire admin CRUD through Redux entity adapter and async thunks (#8)



---
## [v1.3.1] — 2026-05-09

### Chore

- remove docs — moved to tensor-labz/tensor-labz-docs

### Other

- Merge branch 'main' of github.com:tensor-labz/tensor-labz-website
- update CLAUDE.md — all backend live, tensor-labz-docs repo, all 12 field types, Supabase auth references



---
## [v1.3.0] — 2026-05-09

### Added

- live module counts in dashboard + S3 cleanup on record delete
- add search, sort and mobile layout to AdminDataTable
- wire image upload to S3 via Lambda presigned URLs
- migrate admin auth from Firebase to Supabase
- wire admin CRUD and social context to Supabase

### Bug Fixes

- add docs/requirements.txt so pip cache works in docs workflow
- resolve CI TypeScript errors — .finally() on PromiseLike, AbortSignal type
- resolve CI lint failures — prettier format, unused imports, unescaped entities
- add min-w-0 to recharts container divs — prevents -1 dimension warning
- normalize Supabase column names in services and projects fetchers

### Style

- white background on sort dropdown

### Chore

- add S3/CDN vars to .env.example

### Other

- update Lambda repo reference to tensor-labz org
- update HISTORY.md — mark completed steps, list tomorrow's tasks
- add HISTORY.md — session changelog for 2026-05-07
- fix mkdocs site_url and repo_url to tensor-labz org
- add MkDocs site with Mermaid diagrams + GitHub Pages workflow



---

## [v1.1.0] — 2026-05-07

### Added

- add admin dashboard, login, auth guard, Firebase config, and all admin components
- add multi-image field type with gallery grid for extraImages
- full dark/light mode support — glass CSS vars, theme toggle on login and admin
- login and admin inherit Three.js bg, no public header/footer on admin routes
- add login page and admin dashboard with Firebase auth
- add Firebase hosting config and staging deploy script
- add shared/components (ui, layout, feedback, three)
- add Redux store, service layer, shared hooks/types/utils
- shared PageBackground Three.js animation for About Us and Contact Us
- Three.js wireframe scene background on project detail page
- full site refactor with dark/light mode and Three.js particles
- add ErrorBoundary component to prevent blank screen on render errors

### Bug Fixes

- social media links — fetch LinkData directly, read result.data.social_media
- SocialLink href required not optional
- social media links — fetch full array not data[0]
- about page sheet name AboutData → AboutusData
- hero image field name img not imageURL — matches actual sheet column
- hero image not visible on desktop — replace lg:h-full with lg:h-[520px]
- resolve ESLint config errors for CI
- image first in DOM so it appears above text on mobile
- hero image uses lg:h-full with items-stretch so it matches text column height on desktop
- explicit heights on image container so h-full chain resolves on all breakpoints
- restore desktop two-column hero, center-align mobile only
- hero image fills container — add relative to aspect wrapper, use 4:3 on mobile
- hero image no longer clipped — use aspect-video and remove overflow-hidden from section
- routing cleanup and full dark/light mode across all components
- remove inline style overriding Tailwind bg classes on header
- replace react-helmet with react-helmet-async, remove duplicate AnimatePresence keys
- resolve motion animation errors — backgroundColor and backgroundPosition
- add header offset, dark overlays, consistent text colors across all hero sections
- header always dark — semi-transparent before scroll, solid after
- resolve all code review issues (security, bugs, performance)
- performance, architecture and accessibility improvements
- UI bugs, typos, console.log cleanup, accessibility improvements
- XSS sanitization, nav links, missing services route, footer URLs

### Security

- move Google Sheets URL to environment variable

### Performance

- memoize selectHomeServices and selectTopProjects with createSelector

### Refactor

- decouple architecture into features/Redux/services layers
- remove dead code and unused files
- services page consistent with site design system
- single GlobalBackground animation across entire site
- header redesign — slate-900 base, sky-400 accent, soft mechatronics color schema
- remove Powered by credit from footer
- redesign footer — clean 4-column grid, uniform socials, no duplicate code
- redesign navbar — clean text links, CTA button, dark mobile drawer
- standardize all animation imports to motion/react

### Style

- hero title — increase line-height, accent last line
- reduce hero image height on mobile to fit frame
- center hero section content at all breakpoints
- set dark as default theme
- remove overlay on about us page in light mode
- center copyright text in footer

### Chore

- apply prettier formatting to remaining files
- add @reduxjs/toolkit and react-redux

### CI / Build

- simplify production workflow — Amplify now builds directly from GitHub main
- replace ZIP deploy with Bitbucket mirror for Amplify production
- add Amplify ZIP deploy workflow for production (main branch)
- add staging auto-deploy workflow and all GitHub secret vars
- update release workflow to auto-update CHANGELOG on tag bump
- add CI workflow and semantic version bump on release

### Other

- merge staging → main — admin dashboard, CI/CD, Lambda integration, multi-image support
- add deployed Lambda API Gateway URL and setup details
- update S3 bucket/region to tensor-labz-store eu-north-1 with folder map
- document LinkData nested response format in CLAUDE.md
- update CLAUDE.md with Redux architecture, sheet names, and deployment workflow
- customtailwind.css and its import in index.css
- restore original color schema for AboutUs, ContactUs, ServiceHero
- add CLAUDE.md, update README.md, add CHANGELOG.md
- Merge pull request #3 from ThanuMahee12/stagging
- Merge pull request #2 from ThanuMahee12/HEAD

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
