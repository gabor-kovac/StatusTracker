#!/bin/bash

cd src/Assets/Repos
if [ -z "$(ls)" ]; then
    echo "[]" > ../applicationDataFile.json
else
    jq -s "." $(ls) > ../applicationDataFile.json
fi
