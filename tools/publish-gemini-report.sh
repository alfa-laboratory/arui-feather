#!/usr/bin/env sh

echo "Publishing gemini report..."

ROOT="$(dirname $(dirname $0))"
SOURCE_REPORT_DIR="$ROOT/gemini-report"
PUBLISH_REPORT_DIR="$ROOT/gemini-reports/$TRAVIS_BUILD_NUMBER"

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

git remote add upstream "https://$GH_TOKEN@github.com/alfa-laboratory/arui-feather.git"
git fetch -q upstream && git reset -q upstream/gh-pages

mkdir -p $PUBLISH_REPORT_DIR
cp -R $SOURCE_REPORT_DIR/* $PUBLISH_REPORT_DIR

git add -A -f "$PUBLISH_REPORT_DIR"
git commit -q -m "test(gemini): add gemini report by travis build $TRAVIS_BUILD_NUMBER"
git push -q upstream HEAD:gh-pages

echo "Gemini report was successfully published to
https://alfa-laboratory.github.io/arui-feather/gemini-reports/$TRAVIS_BUILD_NUMBER"
