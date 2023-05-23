#!/bin/bash -
#===============================================================================
#
#          FILE: quality-check.sh
#
#         USAGE: ./quality-check.sh
#
#   DESCRIPTION:
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (),
#  ORGANIZATION:
#       CREATED: 03/14/2023 11:54
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error
set -e
set -o pipefail

npm run lint
npm run test
# npm audit
# npm run sonar:check

