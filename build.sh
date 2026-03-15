#!/bin/bash
set -euo pipefail

DIST="dist"

echo "/// Building Galaxy Artifact ///"

# Clean
rm -rf "$DIST"
mkdir -p "$DIST"

# Minify index.html (inline CSS + JS) via simple whitespace reduction
# For production, consider html-minifier-terser: npx html-minifier-terser --collapse-whitespace ...
if command -v npx &>/dev/null && npx --yes html-minifier-terser --version &>/dev/null 2>&1; then
  echo "  Minifying index.html with html-minifier-terser..."
  npx --yes html-minifier-terser \
    --collapse-whitespace \
    --remove-comments \
    --minify-css true \
    --minify-js true \
    -o "$DIST/index.html" \
    index.html
else
  echo "  Copying index.html (install html-minifier-terser for minification)"
  cp index.html "$DIST/index.html"
fi

# Copy vendor (Three.js + addons)
cp -r vendor "$DIST/vendor"

# Copy CSV data files
cp music_library.csv "$DIST/"
cp sample_music.csv "$DIST/"

# Copy PWA assets
cp manifest.json "$DIST/"
cp sw.js "$DIST/"

# Copy static assets if present
[ -f screenshot.png ] && cp screenshot.png "$DIST/"

echo "/// Build complete → $DIST/ ///"
echo "  Files: $(find "$DIST" -type f | wc -l | tr -d ' ')"
echo "  Size:  $(du -sh "$DIST" | cut -f1)"
