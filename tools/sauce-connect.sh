#!/bin/bash

# A fork of https://gist.github.com/henrikhodne/9322897

if [ -z "${SAUCE_USERNAME}" ] || [ -z "${SAUCE_ACCESS_KEY}" ]; then
    echo "This script can't run without your Sauce credentials"
    echo "Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY env variables"
    echo "export SAUCE_USERNAME=ur-username"
    echo "export SAUCE_ACCESS_KEY=ur-access-key"
    exit 1
fi

SAUCE_TMP_DIR="$(mktemp -d -t sc.XXXX)"
echo "Using temp dir $SAUCE_TMP_DIR"
pushd $SAUCE_TMP_DIR

SAUCE_CONNECT_PLATFORM=$(uname | sed -e 's/Darwin/osx/' -e 's/Linux/linux/')
case "${SAUCE_CONNECT_PLATFORM}" in
    linux)
        SC_DISTRIBUTION_FMT=tar.gz
        SC_DISTRIBUTION_SHASUM=4a70c3a559913274a35b056a6e5d274cdbe4fdec;;
    osx)
        SC_DISTRIBUTION_FMT=zip
        SC_DISTRIBUTION_SHASUM=9b8fe1342b94518b9a4e3bc7933cf93873461910;;
esac
SC_DISTRIBUTION=sc-4.4.11-${SAUCE_CONNECT_PLATFORM}.${SC_DISTRIBUTION_FMT}
SC_READYFILE=sauce-connect-ready-$RANDOM
SC_LOGFILE=$HOME/sauce-connect.log
if [ ! -z "${TRAVIS_JOB_NUMBER}" ]; then
  SC_TUNNEL_ID="-i ${TRAVIS_JOB_NUMBER}"
fi
echo "Downloading Sauce Connect"
wget http://saucelabs.com/downloads/${SC_DISTRIBUTION}
SC_ACTUAL_SHASUM="$(openssl sha1 ${SC_DISTRIBUTION} | cut -d' ' -f2)"
if [[ "$SC_ACTUAL_SHASUM" != "$SC_DISTRIBUTION_SHASUM" ]]; then
    echo "SHA1 sum of Sauce Connect file didn't match!"
    exit 1
fi
SC_DIR=$(tar -ztf ${SC_DISTRIBUTION} | head -n1)

echo "Extracting Sauce Connect"
case "${SC_DISTRIBUTION_FMT}" in
    tar.gz)
        tar zxf $SC_DISTRIBUTION;;
    zip)
        unzip $SC_DISTRIBUTION;;
esac

echo "Starting Sauce Connect"
${SC_DIR}/bin/sc \
  ${SC_TUNNEL_ID} \
  -f ${SC_READYFILE} \
  -l ${SC_LOGFILE} &

echo "Waiting for Sauce Connect readyfile"
while [ ! -f ${SC_READYFILE} ]; do
  sleep .5
done

unset SAUCE_CONNECT_PLATFORM SAUCE_TMP_DIR SC_DIR SC_DISTRIBUTION SC_READYFILE SC_LOGFILE SC_TUNNEL_ID

popd
