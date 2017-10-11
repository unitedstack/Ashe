# Ashe

Ashe is a public cloud offical website.

## Install

```bash
nvm use 8 && npm install && npm run build
```

## Script

```bash
# production mode
npm run build

# development watch mode
npm run dev
# build specify page to make build faster
# eg. only build two pages. (home and page-views/about/compony)
npm run dev --pages=home,page-views/about/compony

# generate iconfonts
npm run iconfont

# generate static html files
# npm run dev will watch pages and run this script.
npm run html

# move images to static/assets
# npm run dev will watch images and run this script.
npm run merge_assets

# eslint
npm run eslint

# Add pre-commit hook
# this step will auto run when npm install
npm run add_eslint

```

## PreInstall

When run `npm install`, before install, will check node version.
If current node version is not correspond to engines:node in package.json,
Will throw an error and exit install.

## PrePare

When run `npm install`, after install, will check pre-commit hook.
If no pre-commit in .git/hooks, will push file pre-commit to .git/hooks.
Before `git commit`, will run `npm run eslint`.

## LICENSE
[Apache-2.0](./LICENSE)
