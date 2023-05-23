#!/bin/bash -
#===============================================================================
#
#          FILE: build-client.sh
#
#         USAGE: ./build-client.sh
#
#   DESCRIPTION:
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (),
#  ORGANIZATION:
#       CREATED: 03/13/2023 23:51
#      REVISION:  ---
#===============================================================================

#set -e
#set -o pipefail

echo "$PWD"

SCRIPT_DIR=$PWD
#`dirname "$(readlink -f "$BASH_SOURCE")"`
ROOT_DIR=$PWD
#${SCRIPT_DIR%/*}
CLIENT_BUILD_DIR=$ROOT_DIR/dist
ENV_FILE_PATH=$ROOT_DIR/.env
PATH_TO_QUALITY_SCRIPT="$ROOT_DIR/quality-check.sh"



echo "$ROOT_DIR"
echo "$SCRIPT_DIR"
echo "$CLIENT_BUILD_DIR"
echo "$(basename "../$CLIENT_BUILD_DIR")"

currentBuildArchive=$ROOT_DIR/dist/client-app.zip

echo "$ENV_FILE_PATH"

if [ -e "$ENV_FILE_PATH" ]; then
  # for testing environment variables from .env
  export $(grep -v '^#' $ENV_FILE_PATH | xargs -0)
else
  echo ".env file is not found"
fi

echo "$ENV_CONFIGURATION"

if [ -e "$currentBuildArchive" ]; then
  rm -rf "$currentBuildArvhive"
  echo "Previous build $currentBuildArchive was successfully removed"
fi

rm -rf $CLIENT_BUILD_DIR

rm -rf node_modules

npm cache clean --force

npm i --legacy-peer-deps

# source "$PATH_TO_QUALITY_SCRIPT"

npm run build --configuration=${ENV_CONFIGURATION:-"production"} --output-path=$CLIENT_BUILD_DIR

# zip -r $currentBuildArchive "$(basename "../$CLIENT_BUILD_DIR")"

echo "The application was successfully build with $ENV_CONFIGURATION configuration."
