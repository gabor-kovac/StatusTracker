#!/bin/bash
# Generates applicationData.ts

REPOS=$(ls src/Assets/Repos)

echo "import type { Application } from '../Types/Application';"
echo "var AppList: Application[] = [];"

if [[ -z "$REPOS" ]]; then
    echo "No repo files found" >&2
else
    i=0
    for REPO in $REPOS
    do
        echo "import App$i from './Repos/$REPO'"
        echo "AppList.push(App$i);"
        i=$(( i + 1 ))
    done
fi

echo "export { AppList };"