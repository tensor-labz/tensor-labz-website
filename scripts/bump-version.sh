#!/usr/bin/env bash
# bump-version.sh
# Analyzes commits since the last tag, bumps semantic version,
# updates CHANGELOG.md, commits the changelog, then creates and pushes the tag.
#
# Bump rules (conventional commits):
#   BREAKING CHANGE / feat! → major (x.0.0)
#   feat                    → minor (x.y.0)
#   fix / chore / style / … → patch (x.y.z)

set -euo pipefail

log() { echo "[bump-version] $*"; }
err() { echo "[bump-version] ERROR: $*" >&2; exit 1; }

# ── Get latest tag ────────────────────────────────────────────────────────────

LATEST_TAG=$(git tag --list 'v*' --sort=-version:refname | head -n 1)

if [[ -z "$LATEST_TAG" ]]; then
  log "No existing tag found. Starting from v0.0.0"
  LATEST_TAG="v0.0.0"
  COMMIT_LOG=$(git log --pretty=format:"%H %s" 2>/dev/null || echo "")
else
  log "Latest tag: $LATEST_TAG"
  COMMIT_LOG=$(git log "${LATEST_TAG}..HEAD" --pretty=format:"%H %s" 2>/dev/null || echo "")
fi

if [[ -z "$COMMIT_LOG" ]]; then
  log "No commits since $LATEST_TAG — nothing to bump."
  exit 0
fi

# ── Parse current version ─────────────────────────────────────────────────────

VERSION="${LATEST_TAG#v}"
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"
MAJOR="${MAJOR:-0}"; MINOR="${MINOR:-0}"; PATCH="${PATCH:-0}"

# ── Determine bump type ───────────────────────────────────────────────────────

BUMP="patch"

while IFS= read -r line; do
  SUBJECT="${line#* }"  # strip leading hash
  if echo "$SUBJECT" | grep -qiE '(BREAKING CHANGE|^[a-z]+(\([^)]+\))?!:)'; then
    BUMP="major"; break
  fi
  if echo "$SUBJECT" | grep -qE '^feat(\([^)]+\))?:' && [[ "$BUMP" != "major" ]]; then
    BUMP="minor"
  fi
done <<< "$COMMIT_LOG"

log "Bump type: $BUMP"

# ── Calculate new version ─────────────────────────────────────────────────────

case "$BUMP" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
esac

NEW_TAG="v${MAJOR}.${MINOR}.${PATCH}"
RELEASE_DATE=$(date +%Y-%m-%d)

log "New version: $LATEST_TAG → $NEW_TAG"

# ── Group commits by type for changelog ──────────────────────────────────────

BREAKING=""
FEATS=""
FIXES=""
SECURITY=""
PERF=""
REFACTOR=""
STYLE=""
CHORE=""
CI=""
OTHER=""

while IFS= read -r line; do
  SUBJECT="${line#* }"
  # Strip conventional commit prefix for display, keep message clean
  CLEAN=$(echo "$SUBJECT" | sed -E 's/^[a-z]+(\([^)]+\))?!?: //')

  case "$SUBJECT" in
    BREAKING\ CHANGE*|*!:*)     BREAKING="$BREAKING\n- $CLEAN" ;;
    feat*:*)                     FEATS="$FEATS\n- $CLEAN" ;;
    fix*:*)                      FIXES="$FIXES\n- $CLEAN" ;;
    security*:*)                 SECURITY="$SECURITY\n- $CLEAN" ;;
    perf*:*)                     PERF="$PERF\n- $CLEAN" ;;
    refactor*:*)                 REFACTOR="$REFACTOR\n- $CLEAN" ;;
    style*:*)                    STYLE="$STYLE\n- $CLEAN" ;;
    chore*:*)                    CHORE="$CHORE\n- $CLEAN" ;;
    ci*:*|build*:*)              CI="$CI\n- $CLEAN" ;;
    *)                           OTHER="$OTHER\n- $CLEAN" ;;
  esac
done <<< "$COMMIT_LOG"

# ── Build new changelog section ───────────────────────────────────────────────

NEW_SECTION="## [$NEW_TAG] — $RELEASE_DATE\n"

[[ -n "$BREAKING" ]]  && NEW_SECTION="${NEW_SECTION}\n### Breaking Changes\n${BREAKING}\n"
[[ -n "$FEATS" ]]     && NEW_SECTION="${NEW_SECTION}\n### Added\n${FEATS}\n"
[[ -n "$FIXES" ]]     && NEW_SECTION="${NEW_SECTION}\n### Bug Fixes\n${FIXES}\n"
[[ -n "$SECURITY" ]]  && NEW_SECTION="${NEW_SECTION}\n### Security\n${SECURITY}\n"
[[ -n "$PERF" ]]      && NEW_SECTION="${NEW_SECTION}\n### Performance\n${PERF}\n"
[[ -n "$REFACTOR" ]]  && NEW_SECTION="${NEW_SECTION}\n### Refactor\n${REFACTOR}\n"
[[ -n "$STYLE" ]]     && NEW_SECTION="${NEW_SECTION}\n### Style\n${STYLE}\n"
[[ -n "$CHORE" ]]     && NEW_SECTION="${NEW_SECTION}\n### Chore\n${CHORE}\n"
[[ -n "$CI" ]]        && NEW_SECTION="${NEW_SECTION}\n### CI / Build\n${CI}\n"
[[ -n "$OTHER" ]]     && NEW_SECTION="${NEW_SECTION}\n### Other\n${OTHER}\n"

# ── Publish release: annotated tag + GitHub Release notes ─────────────────────
# NOTE: `main` is a protected branch (accepts PRs from `staging` only), so this
# workflow never commits back to it. CHANGELOG.md is maintained through the
# normal PR flow; here we only tag the released commit and publish the notes as
# a GitHub Release.

NOTES_FILE="$(mktemp)"
printf '%b\n' "$NEW_SECTION" > "$NOTES_FILE"

git config user.name  "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git tag -a "$NEW_TAG" -m "Release $NEW_TAG"
git push origin "$NEW_TAG"

if command -v gh >/dev/null 2>&1; then
  gh release create "$NEW_TAG" \
    --title "$NEW_TAG" \
    --notes-file "$NOTES_FILE" \
    --verify-tag
  log "Released $NEW_TAG — tag pushed and GitHub Release published."
else
  log "Released $NEW_TAG — tag pushed (gh CLI unavailable; create the Release manually)."
fi

# ── Export outputs for GitHub Actions ────────────────────────────────────────

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "new_tag=$NEW_TAG"        >> "$GITHUB_OUTPUT"
  echo "bump_type=$BUMP"         >> "$GITHUB_OUTPUT"
  echo "prev_tag=$LATEST_TAG"    >> "$GITHUB_OUTPUT"
fi
