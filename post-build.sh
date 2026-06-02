#!/bin/bash

DIST_PATH="./dist"

cp "$DIST_PATH/index.html" "$DIST_PATH/404.html"

COMMIT_SHA="$(git rev-parse HEAD)"
cat > "$DIST_PATH/hash.json"<< EOF
{
    "sha": "$COMMIT_SHA"
}
EOF