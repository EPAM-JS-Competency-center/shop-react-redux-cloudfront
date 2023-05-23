#!/bin/bash

ROOT_DIR=$PWD

PATH_TO_QUALITY_SCRIPT="$ROOT_DIR/quality-check.sh"
PATH_TO_BUILD_SCRIPT="$ROOT_DIR/build-client.sh"

CLIENT_HOST_DIR="$ROOT_DIR"

# destination folder names can be changed
CLIENT_REMOTE_DIR=/var/www/shop-client

SSH_USER=ubuntu-sshuser;

check_remote_dir_exists() {
  echo "Check if remote directories exist"

  if ssh $SSH_USER "[ ! -d $1 ]"; then
    echo "Creating: $1"
	ssh -t $SSH_USER "sudo bash -c 'mkdir -p $1 && chown -R sshuser: $1'"
  else
    echo "Clearing: $1"
    ssh $SSH_USER "sudo -S rm -r $1/*"
  fi
}

check_remote_dir_exists $CLIENT_REMOTE_DIR

echo "---> Building and transferring client files - START <---"
echo $CLIENT_HOST_DIR
source "$PATH_TO_QUALITY_SCRIPT"
source "$PATH_TO_BUILD_SCRIPT"

scp -Cr $CLIENT_HOST_DIR/dist/* $SSH_USER:$CLIENT_REMOTE_DIR
echo "---> Building and transferring - COMPLETE <---"
