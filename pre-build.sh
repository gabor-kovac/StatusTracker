#!/bin/bash
# Launches pre build scripts
bash ./jsonJoiner.sh
bash ./script-gen.sh > src/app/data/applicationData.ts && echo "Generated applicationData.ts" >&2
bash ./release-gen.sh > src/app/data/releaseData.ts && echo "Generated releaseData.ts" >&2