#!/bind/bash

set -ueo pipefail

#environment
env=$1

#cucumber tag
tag=$2

export COMMON_CONFIG_FILE='env/common.env'
export NODE_ENV=$env

#run cucumber tests
if ! yarn run cucumber:$env --profile $tag; then
  yarn run postcucumber
  exit 1;
fi
