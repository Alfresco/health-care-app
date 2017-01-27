#!/bin/bash

function link_alfresco_ng2_deps() {
  cd $1
  for dep in $( list-dependencies '^ng2-(alfresco|activiti)-' ); do
    npm link --ignore-scripts $npm_opts "$dep"
  done
}

link_alfresco_ng2_deps "$(pwd)"
test -d "$(pwd)/node_modules/alfresco-js-api" && npm link alfresco-js-api
