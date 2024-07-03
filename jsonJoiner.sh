 #!/bin/bash
 cd src/assets/repos && jq -s "." $(ls) > ../applicationDataFile.json
 cd ../compatibilities && jq -s ".[]" $(ls) > ../compatibilitiesDataFile.json