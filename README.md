# Ashe

Ashe is a public cloud offical website.

[![Build Status](https://travis-ci.org/unitedstack/Ashe.svg?branch=master)](https://travis-ci.org/unitedstack/Ashe)

## Install

```bash
git clone https://github.com/unitedstack/Ashe.git

git submodule update --init --recursive

nvm use 8 && npm install && npm run build
```

## Script

```bash
# production mode (client)
npm run client_build

# development watch mode (client)
npm run client_dev
# build specify page to make build faster
# eg. only build two pages. (home and page-views/about/compony)
npm run client_dev --pages=home,page-views/about/compony

# production mode (admin)
npm run admin_build

# development watch mode (admin)
npm run admin_dev

# generate iconfonts
npm run iconfont

# generate color preview html (default theme is `default`)
npm run palette
# specify theme
npm run palette --theme=XXX

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

## engineStrict hook

engineStrict was removed in npm 3.0.0, so can not specify node version in package.json.
But in `scripts/checkNodeVersion.js`, make engineStrict work.
I just made a hook, when `npm install`, If there is `engineStrict: true` in package.json,
then check variable `engines` in package.json.

`engines` support these types:
```
node: '*'                      -- all node versions
node: '~x.x.x'                 -- A certain version
node: '>=number' or '<number'  -- range (nodeVersion [> or < or <= or >=] number)
node: '>=number <=number'      -- range (number <= nodeVersion <=number)
```

If your local node version is not correspond to variable `engines:node` in package.json. eg:

```json
{
  "engineStrict": true,
  "engines": {
    "node": ">=8"
  }
}
```

But your local node version is v7.9.0, will throw an error like that:

```
Require Node Version >=8
but local node version is v7.9.0
  You can
  `nvm install >=8 or see https://nodejs.org/
```

## LICENSE
[Apache-2.0](./LICENSE)
