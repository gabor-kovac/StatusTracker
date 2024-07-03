#!/bin/bash
# Generates applicationData.ts
echo "Starting AppList generator" >&2

REPOS=$(ls src/assets/repos)

echo "import { Application } from '../classes/Application';"
echo "var AppList: Application[] = [];"

if [[ -z "$REPOS" ]]; then
    echo "No repo files found" >&2
else
    i=0
    for REPO in $REPOS
    do
        echo "import App$i from '../../assets/repos/$REPO'"
        echo "AppList.push(App$i);"
        i=$(( i + 1 ))
    done
fi

echo "export { AppList };"