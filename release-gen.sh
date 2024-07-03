#!/bin/bash
# Generates releaseData.ts
echo "Starting ReleaseList generator" >&2

RELEASES=$(ls src/assets/releases)

echo "import { ApplicationRelease, Release, Test } from '../classes/Release'"
echo "var ReleaseList: ApplicationRelease[] = [];"

if [[ -z "$RELEASES" ]]; then
    echo "No test files found" >&2
else
    i=0
    for RELEASE in $RELEASES
    do
        echo "import Release$i from '../../assets/releases/$RELEASE'"
        echo "var R$i: Release[] = Release$i;"
        echo "ReleaseList.push({\"applicationName\": \"${RELEASE%.json}\", \"releases\": R$i});"
        i=$(( i + 1 ))
    done
fi

echo "export { ReleaseList };"