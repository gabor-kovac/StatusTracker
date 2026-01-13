#!/bin/bash
# Launches pre build scripts
bash ./jsonJoiner.sh
echo "Starting AppList generator"
bash ./script-gen.sh > src/app/data/applicationData.ts && echo "Generated applicationData.ts"
echo "Starting ReleaseList generator"
bash ./release-gen.sh > src/app/data/releaseData.ts && echo "Generated releaseData.ts"