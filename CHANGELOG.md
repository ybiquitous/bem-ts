# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.13.0](https://github.com/ybiquitous/bem-ts/compare/v0.12.1...v0.13.0) (2022-09-08)

### ⚠ BREAKING CHANGES

- drop Node.js 12 support (#884)

### Features

- drop Node.js 12 support ([#884](https://github.com/ybiquitous/bem-ts/issues/884)) ([30a0242](https://github.com/ybiquitous/bem-ts/commit/30a0242c15f2b38a71ddec3bf38105a40de5a176))

### [0.12.1](https://github.com/ybiquitous/bem-ts/compare/v0.12.0...v0.12.1) (2021-09-04)

### Bug Fixes

- update `engines.node` for better ESM support ([#779](https://github.com/ybiquitous/bem-ts/issues/779)) ([6d233a3](https://github.com/ybiquitous/bem-ts/commit/6d233a3f72d73fac552627c6421ff6da59e71bbb))

## [0.12.0](https://github.com/ybiquitous/bem-ts/compare/v0.11.7...v0.12.0) (2021-04-24)

### ⚠ BREAKING CHANGES

- Require Node.js 12.17.0+ and provide `*.cjs` for backward compatibility

### Features

- no longer provide minified version ([#734](https://github.com/ybiquitous/bem-ts/issues/734)) ([7ed62a0](https://github.com/ybiquitous/bem-ts/commit/7ed62a089734fd6a182a3ec76078e647aabd67c4))
- support ESM ([#735](https://github.com/ybiquitous/bem-ts/issues/735)) ([485197a](https://github.com/ybiquitous/bem-ts/commit/485197a803dce0bb96208a2a2000ac9f4b1367bc))

### [0.11.7](https://github.com/ybiquitous/bem-ts/compare/v0.11.6...v0.11.7) (2020-10-20)

### Bug Fixes

- add missing `npm ci` before `npm publish` ([#633](https://github.com/ybiquitous/bem-ts/issues/633)) ([c758167](https://github.com/ybiquitous/bem-ts/commit/c7581676b6ce01a35d3d3ffefc7eda445958e6ba))

### [0.11.6](https://github.com/ybiquitous/bem-ts/compare/v0.11.5...v0.11.6) (2020-10-20)

### Bug Fixes

- add `prepublishOnly` script to build files ([#632](https://github.com/ybiquitous/bem-ts/issues/632)) ([16d64df](https://github.com/ybiquitous/bem-ts/commit/16d64dfbfe738483e2fd304c0e135085cada8b79))

### [0.11.5](https://github.com/ybiquitous/bem-ts/compare/v0.11.4...v0.11.5) (2020-10-19)

### Bug Fixes

- use `Record` type ([#631](https://github.com/ybiquitous/bem-ts/issues/631)) ([5053f06](https://github.com/ybiquitous/bem-ts/commit/5053f06de58541d836e9e78c1cdc729df3770f8a))

### [0.11.4](https://github.com/ybiquitous/bem-ts/compare/v0.11.3...v0.11.4) (2020-08-11)

### [0.11.3](https://github.com/ybiquitous/bem-ts/compare/v0.11.2...v0.11.3) (2020-04-14)

### Bug Fixes

- reconsider and apply ESLint configuration ([#474](https://github.com/ybiquitous/bem-ts/issues/474)) ([dc3acdb](https://github.com/ybiquitous/bem-ts/commit/dc3acdbddcc4bbe5f545dc8d8f31e79f46f3b048))

### [0.11.2](https://github.com/ybiquitous/bem-ts/compare/v0.11.1...v0.11.2) (2020-01-22)

<a name="0.11.1"></a>

## [0.11.1](https://github.com/ybiquitous/bem-ts/compare/v0.11.0...v0.11.1) (2019-06-14)

<a name="0.11.0"></a>

# [0.11.0](https://github.com/ybiquitous/bem-ts/compare/v0.10.0...v0.11.0) (2019-04-08)

### Features

- allow to receive an array as modifiers ([#236](https://github.com/ybiquitous/bem-ts/issues/236)) ([cdad0b1](https://github.com/ybiquitous/bem-ts/commit/cdad0b1))
- disallow elements or modifiers including delimiters ([#241](https://github.com/ybiquitous/bem-ts/issues/241)) ([0ad1e05](https://github.com/ybiquitous/bem-ts/commit/0ad1e05))

<a name="0.10.0"></a>

# [0.10.0](https://github.com/ybiquitous/bem-ts/compare/v0.9.1...v0.10.0) (2019-02-26)

### Features

- migrate from TSLint to ESLint ([#217](https://github.com/ybiquitous/bem-ts/issues/217)) ([09d6d55](https://github.com/ybiquitous/bem-ts/commit/09d6d55))

<a name="0.9.1"></a>

## [0.9.1](https://github.com/ybiquitous/bem-ts/compare/v0.9.0...v0.9.1) (2019-02-15)

### Bug Fixes

- **deps:** migrate from `uglify-es` to `terser` ([#175](https://github.com/ybiquitous/bem-ts/issues/175)) ([799764c](https://github.com/ybiquitous/bem-ts/commit/799764c))
- **security:** `event-stream` vulnerability ([#172](https://github.com/ybiquitous/bem-ts/issues/172)) ([2e74e58](https://github.com/ybiquitous/bem-ts/commit/2e74e58))

<a name="0.9.0"></a>

# [0.9.0](https://github.com/ybiquitous/bem-ts/compare/v0.8.0...v0.9.0) (2018-11-18)

### Features

- support multiple namespaces ([#169](https://github.com/ybiquitous/bem-ts/issues/169)) ([c0bb930](https://github.com/ybiquitous/bem-ts/commit/c0bb930))

<a name="0.8.0"></a>

# [0.8.0](https://github.com/ybiquitous/bem-ts/compare/v0.7.0...v0.8.0) (2018-07-29)

### Features

- remove deprecated `prefix` option ([#115](https://github.com/ybiquitous/bem-ts/issues/115)) ([b96e31a](https://github.com/ybiquitous/bem-ts/commit/b96e31a)), closes [#106](https://github.com/ybiquitous/bem-ts/issues/106)

### BREAKING CHANGES

- remove deprecated `prefix` option

<a name="0.7.0"></a>

# [0.7.0](https://github.com/ybiquitous/bem-ts/compare/v0.6.1...v0.7.0) (2018-07-09)

### Features

- distribute files for ES modules (also support browser) ([#105](https://github.com/ybiquitous/bem-ts/issues/105)) ([1f2010a](https://github.com/ybiquitous/bem-ts/commit/1f2010a))

<a name="0.6.1"></a>

## [0.6.1](https://github.com/ybiquitous/bem-ts/compare/v0.6.0...v0.6.1) (2018-06-08)

### Bug Fixes

- avoid anonymous function for more clear stack trace ([#79](https://github.com/ybiquitous/bem-ts/issues/79)) ([f758de4](https://github.com/ybiquitous/bem-ts/commit/f758de4))

<a name="0.6.0"></a>

# [0.6.0](https://github.com/ybiquitous/bem-ts/compare/v0.5.0...v0.6.0) (2018-02-23)

### Bug Fixes

- generate multi classes with modifiers ([#43](https://github.com/ybiquitous/bem-ts/issues/43)) ([188d643](https://github.com/ybiquitous/bem-ts/commit/188d643))

### Performance Improvements

- remove useless truthy check in `.filter()` via casting ([#42](https://github.com/ybiquitous/bem-ts/issues/42)) ([ce1f3be](https://github.com/ybiquitous/bem-ts/commit/ce1f3be))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/ybiquitous/bem-ts/compare/v0.4.1...v0.5.0) (2018-02-23)

### Features

- allow `null` or `undefined` to modifiers ([#41](https://github.com/ybiquitous/bem-ts/issues/41)) ([b4e1266](https://github.com/ybiquitous/bem-ts/commit/b4e1266))

<a name="0.4.1"></a>

## [0.4.1](https://github.com/ybiquitous/bem-ts/compare/v0.4.0...v0.4.1) (2018-02-23)

### Performance Improvements

- avoid repeated evaluation in each function call ([#39](https://github.com/ybiquitous/bem-ts/issues/39)) ([07e2722](https://github.com/ybiquitous/bem-ts/commit/07e2722))
- avoid unnecessary multiple string interpolation ([#40](https://github.com/ybiquitous/bem-ts/issues/40)) ([1975b93](https://github.com/ybiquitous/bem-ts/commit/1975b93))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/ybiquitous/bem-ts/compare/v0.3.0...v0.4.0) (2018-02-22)

### Features

- new `namespace` / `namespaceDelimiter` options ([#36](https://github.com/ybiquitous/bem-ts/issues/36)) ([b7ca16a](https://github.com/ybiquitous/bem-ts/commit/b7ca16a))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/ybiquitous/bem-ts/compare/v0.2.0...v0.3.0) (2018-02-14)

### Features

- add `setup` method to change default options ([#22](https://github.com/ybiquitous/bem-ts/issues/22)) ([f7a71cc](https://github.com/ybiquitous/bem-ts/commit/f7a71cc))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/ybiquitous/bem-ts/compare/v0.1.2...v0.2.0) (2018-02-13)

### Features

- customizable delimiters via new options ([#17](https://github.com/ybiquitous/bem-ts/issues/17)) ([bd5910b](https://github.com/ybiquitous/bem-ts/commit/bd5910b))
- new `prefix` option ([#18](https://github.com/ybiquitous/bem-ts/issues/18)) ([2b47fb8](https://github.com/ybiquitous/bem-ts/commit/2b47fb8))

<a name="0.1.2"></a>

## [0.1.2](https://github.com/ybiquitous/bem-ts/compare/v0.1.1...v0.1.2) (2018-01-31)

<a name="0.1.1"></a>

## [0.1.1](https://github.com/ybiquitous/bem-ts/compare/v0.1.0...v0.1.1) (2018-01-30)

<a name="0.1.0"></a>

# 0.1.0 (2018-01-30)

### Features

- first release ([0d34684](https://github.com/ybiquitous/bem-ts/commit/0d34684))
