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

# ── Update CHANGELOG.md ───────────────────────────────────────────────────────

CHANGELOG="CHANGELOG.md"

if [[ ! -f "$CHANGELOG" ]]; then
  err "$CHANGELOG not found. Run from repo root."
fi

# Replace the [Unreleased] header line with the versioned section,
# then prepend a fresh [Unreleased] block at the top of entries.
UNRELEASED_BLOCK="## [Unreleased]\n"

# Use awk: when we hit the first "## [Unreleased]" line, replace it with
# the fresh [Unreleased] block + separator + new versioned section.
awk -v new_unreleased="$UNRELEASED_BLOCK" \
    -v new_section="$NEW_SECTION" \
    -v sep="---" \
    'BEGIN { replaced=0 }
     /^## \[Unreleased\]/ && !replaced {
       printf "%s\n%s\n%s\n\n", new_unreleased, sep, new_section
       replaced=1
       next
     }
     { print }
    ' "$CHANGELOG" > "${CHANGELOG}.tmp" && mv "${CHANGELOG}.tmp" "$CHANGELOG"

log "CHANGELOG.md updated."

# ── Commit changelog and push tag ────────────────────────────────────────────

git config user.name  "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git add "$CHANGELOG"
git commit -m "chore(release): $NEW_TAG"

git tag -a "$NEW_TAG" -m "Release $NEW_TAG"

git push origin HEAD
git push origin "$NEW_TAG"

log "Released $NEW_TAG — changelog committed and tag pushed."

# ── Export outputs for GitHub Actions ────────────────────────────────────────

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "new_tag=$NEW_TAG"        >> "$GITHUB_OUTPUT"
  echo "bump_type=$BUMP"         >> "$GITHUB_OUTPUT"
  echo "prev_tag=$LATEST_TAG"    >> "$GITHUB_OUTPUT"
fi
