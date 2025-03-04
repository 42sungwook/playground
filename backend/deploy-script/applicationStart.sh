#!/bin/bash

# https://github.com/nvm-sh/nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
cd ~/sungwook-backend/app && pnpm i || exit 1
nohup pnpm start:prod > ./nohup.out 2>&1  &