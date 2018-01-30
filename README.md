# bem-ts

[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

BEM class names generator for TypeScript

Inspired by [`bem-cn`](https://npm.im/bem-cn).

## Usage

```ts
import bem from "bem-ts";

const b = bem("block");

b();                                          //=> "block"
b({ a: true, b: false });                     //=> "block--a"
b({ a: true, b: false, c: true });            //=> "block--a block--c"
b("element");                                 //=> "block__element"
b("element", { a: true, b: false });          //=> "block__element--a"
b("element", { a: true, b: false, c: true }); //=> "block__element--a block__element--c"
```

## Install

```sh
npm install bem-ts
```

## Test

```sh
npm test
```

## Build

```sh
npm run build
```

## Lint

```sh
npm run lint
```

## Release

```sh
git checkout master
git pull
npm run release:dry-run
npm run release
```
