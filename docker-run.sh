#!/bin/bash

__START_TIME=$(date +%s)

appName=$1
appVersion=$2

echo "Remove running container, if exists…"
docker rm -f $appName

echo "Running container…"
docker run -it \
    -v $PWD/src:/home/nodejs/app/src \
    --name $appName $appName:$appVersion