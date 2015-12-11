#!/usr/bin/env bash

FILEPATH=$(cd `dirname "${BASH_SOURCE[0]}"` && pwd)

ln -s ${FILEPATH}/dict.js /usr/local/bin/dict

echo symbol link created. 
