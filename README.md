# bem-ts

[![NPM version](https://img.shields.io/npm/v/bem-ts.svg)](https://npm.im/bem-ts)
[![Build Status](https://travis-ci.org/ybiquitous/bem-ts.svg?branch=master)](https://travis-ci.org/ybiquitous/bem-ts)
[![dependencies Status](https://david-dm.org/ybiquitous/bem-ts/status.svg)](https://david-dm.org/ybiquitous/bem-ts)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

BEM class names generator for TypeScript.

Inspired by [`bem-cn`](https://npm.im/bem-cn).

## Policy

- No extra features. Dead simple.
- TypeScript support.

## Usage

```ts
import block from "bem-ts";

const b = block("block");

b();
//=> "block"

b({ a: true, b: false });
//=> "block--a"

b({ a: true, b: false, c: true });
//=> "block--a block--c"

b("element");
//=> "block__element"

b("element", { a: true, b: false });
//=> "block__element--a"

b("element", { a: true, b: false, c: true });
//=> "block__element--a block__element--c"
```

### `elementDelimiter = "__"`

```ts
const b = block("block", { elementDelimiter: "_" });

b("element");
//=> "block_element"
```

### `modifierDelimiter = "--"`

```ts
const b = block("block", { modifierDelimiter: "-" });

b({ a: true });
//=> "block-a"

b("element", { a: true });
//=> "block__element-a"
```

### `prefix = ""`

```ts
const b = block("block", { prefix: "pre---" });

b();
//=> "pre---block"

b("element", { a: true, b: true });
//=> "pre---block__element--a pre---block__element--b"
```

## Install

```sh
npm install bem-ts
```

## Test

```sh
npm test
```

## Release

```sh
git checkout master
git pull
npm run release:dry-run
npm run release
```

NOTE: `npm publish` will be executed in CI.
