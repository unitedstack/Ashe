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
npm run html

# eslint
npm run eslint

# Add pre-commit hook
# this step will auto run when npm install
npm run add_eslint

```

## LICENSE
[MIT](./LICENSE)