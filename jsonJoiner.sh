#!/bin/bash

cd src/assets/repos
if [ -z "$(ls)" ]; then
    echo "[]" > ../applicationDataFile.json
else
    jq -s "." $(ls) > ../applicationDataFile.json
fi

cd ../compatibilities
if [ -z "$(ls)" ]; then
    echo "[]" > ../compatibilitiesDataFile.json
else
    jq -s ".[]" $(ls) > ../compatibilitiesDataFile.json
fi
