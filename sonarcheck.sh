#!/bin/bash
# Reports summary of excess Sonarcloud projects not present on Github

OUTPUT_SUMMARY_FILE="src/assets/sonarExtra.json"

if [[ -z "$SONAR_TOKEN" ]]; then
    echo "SONAR_TOKEN env is empty, exiting." >&2
    exit 1;
fi

if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "GITHUB_TOKEN env is empty, exiting." >&2
    exit 1;
fi

SONAR_PROJECTS=$(curl -s -H "Authorization: Bearer $SONAR_TOKEN" "https://sonarcloud.io/api/projects/search?organization=example&ps=500" | jq -r '[.components | .[].name] | sort')
GITHUB_REPOS=$(sh -c "./gh-get-json.sh $GITHUB_TOKEN /orgs/example/repos | jq -r '[.[].name] | sort'")

if [[ -z "$SONAR_PROJECTS" ]]; then
    echo "Couldn't get Sonar projects, exiting." >&2
    exit 1;
fi

if [[ -z "$GITHUB_REPOS" ]]; then
    echo "Couldn't get Github repos, exiting." >&2
    exit 1;
fi

echo $SONAR_PROJECTS | jq -r '.[]' > /tmp/sonarProjects.json
echo $GITHUB_REPOS | jq -r '.[]' > /tmp/githubRepos.json

SONAR_COUNT=0
GITHUB_COUNT=0
while read -r project; do
    ((SONAR_COUNT++))
done < /tmp/sonarProjects.json

while read -r repo; do
    ((GITHUB_COUNT++))
    cat /tmp/sonarProjects.json | jq -Rrc '. | select(test($project) | not)' --arg project $repo | sponge /tmp/sonarProjects.json
done < /tmp/githubRepos.json

EXTRA_REPOS=$(cat /tmp/sonarProjects.json | jq -R '[.]')
echo $EXTRA_REPOS > $OUTPUT_SUMMARY_FILE

echo "Sonar projects: $SONAR_COUNT"
echo "Github repos: $GITHUB_COUNT"

if [[ -z "$EXTRA_REPOS" ]]; then
    echo "No extra projects present on Sonarcloud"
    echo "[]" > $OUTPUT_SUMMARY_FILE
else
    echo "Sonar projects not present on github:"
    echo "$EXTRA_REPOS"
fi
