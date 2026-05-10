#!/bin/bash

cd src/Assets/Repos
if [ -z "$(ls)" ]; then
    echo "[]" > ../applicationDataFile.json
else
    jq -s "." $(ls) > ../applicationDataFile.json
fi

cd ../Compatibilities
if [ -z "$(ls)" ]; then
    echo "[]" > ../compatibilityDataFile.json
else
    jq -s ".[]" $(ls) > ../compatibilityDataFile.json
fi
