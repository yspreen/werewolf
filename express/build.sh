#!/bin/sh

export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
nvm use

yarn tsc
yarn install --prod
rm -rf bundle
mkdir bundle
cp -r src/* node_modules package.json README.md bundle
find bundle -iname '*.ts' | while read f
do
    rm "$f"
done
find src -iname '*.js' | while read f
do
    rm "$f"
done
find src -iname '*.d.ts' | grep -v 'src/module.d.ts' | while read f
do
    rm "$f"
done
yarn install
