#!/bin/bash
# Launches pre build scripts

echo "Starting JSON joiner"
bash ./json-joiner.sh

echo "Starting AppList generator"
bash ./generate-application-data.sh > src/Assets/ApplicationData.ts && echo "Generated ApplicationData.ts"

echo "Starting ReleaseList generator"
bash ./generate-release-data.sh > src/Assets/ReleaseData.ts && echo "Generated ReleaseData.ts"