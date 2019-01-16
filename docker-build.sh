#! /bin/bash

__START_TIME=$(date +%s)

appName=$1
appVersion=$2
image="$appName:$appVersion"

echo "image: $image"

doesImageExist=$(docker images -q $image)


if [[ "$doesImageExist" != "" ]]; then
  echo "Image already exists"
else
  echo "Building image..."
  docker build -t $image .
fi

__BUILD_CONTAINER_TIME=$(date +%s)

__END_TIME=$(date +%s)
# echo "Build application time: $(( $__BUILD_APP_TIME - $__INSTALL_DEPENDENCIES_TIME ))s"
# echo "Build container time: $(( $__BUILD_CONTAINER_TIME - $__REMOVE_BUILD_DEPENDENCIES_TIME ))s"
# echo "Total time: $(( $__END_TIME - $__START_TIME ))s"