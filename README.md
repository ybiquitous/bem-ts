# bem-ts

[![npm](https://img.shields.io/npm/v/bem-ts.svg)](https://npm.im/bem-ts)
[![node](https://img.shields.io/node/v/bem-ts.svg)](https://github.com/ybiquitous/bem-ts)

[BEM](http://getbem.com/) (Block Element Modifier) class names generator for TypeScript.

Inspired by [`bem-cn`](https://npm.im/bem-cn).

## Policy

- No extra features. Dead simple.
- No dependencies.
- TypeScript support.

## Install

```shell
npm install bem-ts
```

## Usage

The following is a basic usage.

```ts
import bem from "bem-ts";

const b = bem("block");

b();
//=> "block"

b({ mod1: true, mod2: false });
//=> "block block--mod1"

b({ mod1: true, mod2: false, mod3: true });
//=> "block block--mod1 block--mod3"

b(["mod1", null, "mod3"]);
//=> "block block--mod1 block--mod3"

b("element");
//=> "block__element"

b("element", { mod1: true, mod2: false });
//=> "block__element block__element--mod1"

b("element", { mod1: true, mod2: false, mod3: true });
//=> "block__element block__element--mod1 block__element--mod3"

b("element", ["mod1", null, "mod3"]);
//=> "block__element block__element--mod1 block__element--mod3"
```

The following is a complicated example (nearer to real world) by using React and Sass.

```tsx
// Button.tsx
import * as React from "react";
import bem from "bem-ts";
import "./Button.scss";

const b = bem("Button");

interface Props {
  state: "success" | "danger";
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function Button({ state, icon, children }: Props) {
  return (
    <button className={b({ state })}>
      <i className={b("icon", { state })}>{icon}</i>
      {children}
    </button>
  );
}
```

```scss
// Button.scss
.Button {
  // block styles...

  &--success {
    // modifier styles...
  }

  &--danger {
    // modifier styles...
  }

  &__icon {
    // element styles...

    &--success {
      // element's modifier styles...
    }

    &--danger {
      // element's modifier styles...
    }
  }
}
```

See also the online demo below!

[![Edit bem-ts demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kxymx2r2z5)

## API

### `bem()`

The `bem()` function receives a block name and creates a new function which generates class names. The created function can receive elements or modifiers.

The `bem()` function can receive the following options.

| Name                                        | Type                 | Default |
| ------------------------------------------- | -------------------- | ------- |
| [`elementDelimiter`](#elementdelimiter)     | `string`             | `"__"`  |
| [`modifierDelimiter`](#modifierdelimiter)   | `string`             | `"--"`  |
| [`namespace`](#namespace)                   | `string`, `string[]` | `""`    |
| [`namespaceDelimiter`](#namespacedelimiter) | `string`             | `"-"`   |
| [`strict`](#strict)                         | `boolean`            | `true`  |

#### `elementDelimiter`

```ts
const b = bem("block", { elementDelimiter: "_" });

b("element");
//=> "block_element"
```

#### `modifierDelimiter`

```ts
const b = bem("block", { modifierDelimiter: "-" });

b({ mod: true });
//=> block "block-mod"

b("element", { mod: true });
//=> "block__element block__element-mod"
```

#### `namespace`

```ts
const b = bem("block", { namespace: "ns" });

b();
//=> "ns-block"

b("element", { mod1: true, mod2: true });
//=> "ns-block__element ns-block__element--mod1 ns-block__element--mod2"
```

```ts
const b = bem("block", { namespace: ["ns1", "ns2"] });

b();
//=> "ns1-ns2-block"

b("element", { mod1: true, mod2: true });
//=> "ns1-ns2-block__element ns1-ns2-block__element--mod1 ns1-ns2-block__element--mod2"
```

#### `namespaceDelimiter`

```ts
const b = bem("block", { namespace: "ns", namespaceDelimiter: "---" });

b();
//=> "ns---block"

b("element", { mod1: true, mod2: true });
//=> "ns---block__element ns---block__element--mod1 ns---block__element--mod2"
```

When `namespace` is not given, `namespaceDelimiter` will be ignored.

```ts
const b = bem("block", { namespaceDelimiter: "---" });

b();
//=> "block"

b("element", { mod1: true, mod2: true });
//=> "block__element block__element--mod1 block__element--mod2"
```

#### `strict`

When you set `true` to this option, given elements or modifiers are checked.
And if the check fails, then an runtime error is thrown.

For example, when setting `true`, the following code throws an error.

```ts
const b = bem("foo", { strict: true });
b("element__");
b({ modifier--: true });
```

When setting `false`, the following code throws no errors.

```ts
const b = bem("foo", { strict: false });
b("element__");
//=> foo__element__
b({ modifier_: true });
//=> foo__modifier_
```

### `setup()`

The `setup()` function can change the default options.

```ts
import bem, { setup } from "bem-ts";

setup({
  elementDelimiter: "_",
  modifierDelimiter: "-",
  namespace: "ns",
  namespaceDelimiter: "---",
  strict: false,
});

const b = bem("block");

b("element", { mod: true });
//=> "ns---block_element ns---block_element-mod"
```

## Development

### Test

    npm test

When you see a coverage report, execute the following command:

    npm run test:coverage

### Release

On your local machine, execute the following commands:

1.  `npm run release:dry-run`
2.  `npm run release`

## License

[MIT](LICENSE) © Masafumi Koba
