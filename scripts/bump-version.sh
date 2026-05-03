#!/usr/bin/env bash
# bump-version.sh
# Analyzes commits since the last tag and bumps version using semantic versioning.
# Bump rules (conventional commits):
#   BREAKING CHANGE / feat! → major (x.0.0)
#   feat                    → minor (x.y.0)
#   fix / chore / style / … → patch (x.y.z)

set -euo pipefail

# ── Helpers ─────────────────────────────────────────────────────────────────

log()  { echo "[bump-version] $*"; }
err()  { echo "[bump-version] ERROR: $*" >&2; exit 1; }

# ── Get latest tag ───────────────────────────────────────────────────────────

LATEST_TAG=$(git tag --list 'v*' --sort=-version:refname | head -n 1)

if [[ -z "$LATEST_TAG" ]]; then
  log "No existing tag found. Starting from v0.0.0"
  LATEST_TAG="v0.0.0"
  COMMITS=$(git log --pretty=format:"%s%n%b" 2>/dev/null || echo "")
else
  log "Latest tag: $LATEST_TAG"
  COMMITS=$(git log "${LATEST_TAG}..HEAD" --pretty=format:"%s%n%b" 2>/dev/null || echo "")
fi

if [[ -z "$COMMITS" ]]; then
  log "No commits since $LATEST_TAG — nothing to bump."
  exit 0
fi

# ── Parse current version ────────────────────────────────────────────────────

VERSION="${LATEST_TAG#v}"   # strip leading 'v'
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

MAJOR="${MAJOR:-0}"
MINOR="${MINOR:-0}"
PATCH="${PATCH:-0}"

# ── Determine bump type ──────────────────────────────────────────────────────

BUMP="patch"  # default

while IFS= read -r line; do
  # Breaking change: body contains "BREAKING CHANGE" or subject has "!"
  if echo "$line" | grep -qiE '(BREAKING CHANGE|^[a-z]+(\([^)]+\))?!:)'; then
    BUMP="major"
    break
  fi
  # Minor: feat commit
  if echo "$line" | grep -qE '^feat(\([^)]+\))?:'; then
    BUMP="minor"
  fi
done <<< "$COMMITS"

log "Commits analyzed — bump type: $BUMP"

# ── Calculate new version ────────────────────────────────────────────────────

case "$BUMP" in
  major)
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
    ;;
  minor)
    MINOR=$((MINOR + 1))
    PATCH=0
    ;;
  patch)
    PATCH=$((PATCH + 1))
    ;;
esac

NEW_TAG="v${MAJOR}.${MINOR}.${PATCH}"
log "New version: $LATEST_TAG → $NEW_TAG"

# ── Create and push tag ──────────────────────────────────────────────────────

git config user.name  "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git tag -a "$NEW_TAG" -m "Release $NEW_TAG"
git push origin "$NEW_TAG"

log "Tag $NEW_TAG pushed successfully."

# Export for use in GitHub Actions step outputs
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "new_tag=$NEW_TAG"   >> "$GITHUB_OUTPUT"
  echo "bump_type=$BUMP"    >> "$GITHUB_OUTPUT"
  echo "prev_tag=$LATEST_TAG" >> "$GITHUB_OUTPUT"
fi
