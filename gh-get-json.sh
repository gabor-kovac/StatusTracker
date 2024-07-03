#!/bin/bash                                                                                                                                                                                                                                              

set -e

if [ ${#@} -lt 2 ]; then
    echo "usage: $0 [your github token] [REST expression]"
    exit 1;
fi

GITHUB_TOKEN=$1
GITHUB_API_REST=$2

GITHUB_API_HEADER_ACCEPT="Accept: application/vnd.github.v3+json"

temp=`basename $0`
TMPFILE=`mktemp /tmp/${temp}.XXXXXX` || exit 1

function rest_call {
    curl -s $1 -H "${GITHUB_API_HEADER_ACCEPT}" -H "Authorization: token $GITHUB_TOKEN" | sed -e 's/^\[$//g' -e 's/^\]$/,/g' >> $TMPFILE
}

# single page result-s (no pagination), have no Link: section, the grep result is empty                                                                                                                                                                  
last_page=`curl -s -I "https://api.github.com${GITHUB_API_REST}" -H "${GITHUB_API_HEADER_ACCEPT}" -H "Authorization: token $GITHUB_TOKEN" | grep '^link:' | sed -e 's/^link:.*page=//g' -e 's/>.*$//g'`

# does this result use pagination?                                                                                                                                                                                                                       
if [ -z "$last_page" ]; then
    # no - this result has only one page                                                                                                                                                                                                                 
    rest_call "https://api.github.com${GITHUB_API_REST}"
else
    # yes - this result is on multiple pages                                                                                            
    for p in `seq 1 $last_page`; do
        rest_call "https://api.github.com${GITHUB_API_REST}?page=$p"
    done
fi

line_counter=`wc -l $TMPFILE | sed -e 's/[/a-zA-Z].*$//g'`
#echo "TMPFILE:$TMPFILE"                                                                                      
#echo "line_counter:$line_counter"                                                                                                                                                                                                                       
echo "["
head -n $(($line_counter - 1)) $TMPFILE
echo "]"
