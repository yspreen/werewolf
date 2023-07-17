#!/bin/sh
tsc
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
