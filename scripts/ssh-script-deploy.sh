#!/bin/bash
set -e
source ~/.bash_profile

ENV=$1

if [[ "$ENV" == "production" ]]; then
  WWW_SUBDOMAIN="app"
  API_SUBDOMAIN="api"
  BRANCH="master"
elif [[ "$ENV" == "staging" ]]; then
  WWW_SUBDOMAIN="staging"
  API_SUBDOMAIN="staging-api"
  BRANCH="develop"
else
  echo 'Incorrect environment. "production" or "staging" allowed.'
  exit 1
fi

node -v
yarn -v

cd ~/domains/devfaq.pl/devfaq/$ENV

echo "ENV:" $ENV
echo "BRANCH:" $BRANCH
echo "WWW_SUBDOMAIN" $WWW_SUBDOMAIN
echo "API_SUBDOMAIN" $API_SUBDOMAIN
echo "Current directory:" $(pwd)

echo "👉 Pulling from the server…"
git fetch origin --tags
git checkout $BRANCH

# if git diff --quiet remotes/origin/$BRANCH; then
#   echo "👉 Up to date; nothing to do!"
#   exit
# fi

if git diff --name-only HEAD remotes/origin/$BRANCH | grep -q "apps/api/"
then
  API_CHANGED=1;
fi

if git diff --name-only HEAD remotes/origin/$BRANCH | grep -q "apps/www/"
then
  WWW_CHANGED=1;
fi

git pull origin $BRANCH

echo $ENVIRONMENT:`git rev-parse --abbrev-ref HEAD`:`git rev-parse HEAD` > .version
echo "🥁 VERSION: "$(cat .version)
cp .version apps/api/
cp .version apps/www/

if [ -n "$API_CHANGED" ] && [ -n "$WWW_CHANGED" ]; then
  echo "👩‍💻 Installing both API and WWW"
  yarn install --frozen-lockfile
  
  echo "👉 Bulding both API and WWW…"
  NODE_ENV=production ENV=$ENV yarn run build
elif [ -n "$API_CHANGED" ]; then
  echo "👾 Installing only API"
  yarn workspace api install --focus --frozen-lockfile
  
  echo "👉 Bulding only API…"
  NODE_ENV=production ENV=$ENV yarn workspace api build
elif [ -n "$WWW_CHANGED" ]; then
  echo "🌍 Installing only WWW"
  yarn workspace www install --focus --frozen-lockfile
  
  echo "👉 Bulding only WWW…"
  NODE_ENV=production ENV=$ENV yarn workspace www build
else
  echo 'No changes inside /apps. Exiting.'
  exit 0
fi

if [ -n "$API_CHANGED" ]; then
  echo "👉 Running API migrations…"
  NODE_ENV=production ENV=$ENV yarn workspace api db:migrate:up
  echo "👉 Restarting API server…"
  devil www restart $API_SUBDOMAIN.devfaq.pl
  curl -I https://$API_SUBDOMAIN.devfaq.pl
fi

if [ -n "$WWW_CHANGED" ]; then
  echo "👉 Restarting WWW server…"
  devil www restart $WWW_SUBDOMAIN.devfaq.pl
  curl -I https://$WWW_SUBDOMAIN.devfaq.pl
fi

echo "👉 Done! 😱 👍"
