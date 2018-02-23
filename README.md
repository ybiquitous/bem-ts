# bem-ts

[![NPM version](https://img.shields.io/npm/v/bem-ts.svg)](https://npm.im/bem-ts)
[![Build Status](https://travis-ci.org/ybiquitous/bem-ts.svg?branch=master)](https://travis-ci.org/ybiquitous/bem-ts)
[![dependencies Status](https://david-dm.org/ybiquitous/bem-ts/status.svg)](https://david-dm.org/ybiquitous/bem-ts)
[![SideCI Available](https://img.shields.io/badge/SideCI-available-blue.svg)](https://sideci.com)
[![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

BEM class names generator for TypeScript.

Inspired by [`bem-cn`](https://npm.im/bem-cn).

## Policy

* No extra features. Dead simple.
* TypeScript support.

## Install

```sh
npm install bem-ts
```

## Usage

```ts
import block from 'bem-ts'

const b = block('block')

b()
//=> 'block'

b({ mod1: true, mod2: false })
//=> 'block block--mod1'

b({ mod1: true, mod2: false, mod3: true })
//=> 'block block--mod1 block--mod3'

b('element')
//=> 'block__element'

b('element', { mod1: true, mod2: false })
//=> 'block__element block__element--mod1'

b('element', { mod1: true, mod2: false, mod3: true })
//=> 'block__element block__element--mod1 block__element--mod3'
```

### `elementDelimiter = '__'`

```ts
const b = block('block', { elementDelimiter: '_' })

b('element')
//=> 'block_element'
```

### `modifierDelimiter = '--'`

```ts
const b = block('block', { modifierDelimiter: '-' })

b({ mod: true })
//=> block 'block-mod'

b('element', { mod: true })
//=> 'block__element block__element-mod'
```

### `namespace = ''`

```ts
const b = block('block', { namespace: 'ns' })

b()
//=> 'ns-block'

b('element', { mod1: true, mod2: true })
//=> 'ns-block__element ns-block__element--mod1 ns-block__element--mod2'
```

### `namespaceDelimiter = '-'`

```ts
const b = block('block', { namespace: 'ns', namespaceDelimiter: '---' })

b()
//=> 'ns---block'

b('element', { mod1: true, mod2: true })
//=> 'ns---block__element ns---block__element--mod1 ns---block__element--mod2'
```

When `namespace` is not given, `namespaceDelimiter` will be ignored.

```ts
const b = block('block', { namespaceDelimiter: '---' })

b()
//=> 'block'

b('element', { mod1: true, mod2: true })
//=> 'block__element block__element--mod1 block__element--mod2'
```

### `prefix = ''`

**[DEPRECATED]**: Please use `namespace` and `namespaceDelimiter`.

```ts
const b = block('block', { prefix: 'pre---' })

b()
//=> 'pre---block'

b('element', { mod1: true, mod2: true })
//=> 'pre---block__element pre---block__element--mod1 pre---block__element--mod2'
```

### `setup()`

Change default options.

```ts
import block, { setup } from 'bem-ts'

setup({
  elementDelimiter: '_',
  modifierDelimiter: '-',
  namespace: 'ns',
  namespaceDelimiter: '---'
})

const b = block('block')

b('element', { mod: true })
//=> 'ns---block_element ns---block_element-mod'
```

## Change Log

Please see [here](CHANGELOG.md).

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
