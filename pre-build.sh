#!/bin/bash
# Launches pre build scripts

echo "Starting JSON joiner"
bash ./json-joiner.sh

echo "Starting AppList generator"
bash ./generate-application-data.sh > src/Assets/ApplicationData.ts && echo "Generated ApplicationData.ts"
