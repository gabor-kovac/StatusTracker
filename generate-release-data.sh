#!/bin/bash
# Generates releaseData.ts

RELEASES=$(ls src/Assets/Releases)

echo "import type { ApplicationRelease, Release, Test } from '../Types/Release'"
echo "const ReleaseList: ApplicationRelease[] = [];"

if [[ -z "$RELEASES" ]]; then
    echo "No test files found" >&2
else
    i=0
    for RELEASE in $RELEASES
    do
        echo "import Release$i from './Releases/$RELEASE'"
        echo "const R$i: Release[] = Release$i;"
        echo "ReleaseList.push({\"applicationName\": \"${RELEASE%.json}\", \"releases\": R$i});"
        i=$(( i + 1 ))
    done
fi

echo "export { ReleaseList };"