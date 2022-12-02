# bem-ts

[![npm](https://img.shields.io/npm/v/bem-ts.svg)](https://npm.im/bem-ts)
[![node](https://img.shields.io/node/v/bem-ts.svg)](https://github.com/ybiquitous/bem-ts)

[BEM](http://getbem.com/) (_Block Element Modifier_) class names generator for TypeScript.

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

A basic usage:

```typescript
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

A more complex example using React and CSS (closer to the real world):

```tsx
// Button.tsx
import React from "react";
import bem from "bem-ts";
import "./Button.css";

const b = bem("Button");

type Props = {
  state: "success" | "danger";
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function Button({ state, icon, children }: Props) {
  return (
    <button className={b([state])}>
      <i className={b("icon", [state])}>{icon}</i>
      {children}
    </button>
  );
}
```

```css
/* Button.css */
.Button {
  /* Block */
}
.Button--success {
  /* Modifier */
}
.Button--danger {
  /* Modifier */
}
.Button__icon {
  /* Element */
}
.Button__icon--success {
  /* Element's modifier */
}
.Button__icon--danger {
  /* Element's modifier */
}
```

## Demo

[![Edit bem-ts demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kxymx2r2z5)

## API

### `bem()`

The `bem()` function receives a block name and creates a new function that generates class names. The created function can receive elements or modifiers.

The function can receive the following options:

| Name                                        | Type                 | Default |
| ------------------------------------------- | -------------------- | ------- |
| [`elementDelimiter`](#elementdelimiter)     | `string`             | `"__"`  |
| [`modifierDelimiter`](#modifierdelimiter)   | `string`             | `"--"`  |
| [`namespace`](#namespace)                   | `string`, `string[]` | `""`    |
| [`namespaceDelimiter`](#namespacedelimiter) | `string`             | `"-"`   |
| [`strict`](#strict)                         | `boolean`            | `true`  |

#### `elementDelimiter`

```typescript
const b = bem("block", { elementDelimiter: "_" });

b("element");
//=> "block_element"
```

#### `modifierDelimiter`

```typescript
const b = bem("block", { modifierDelimiter: "-" });

b({ mod: true });
//=> block "block-mod"

b("element", { mod: true });
//=> "block__element block__element-mod"
```

#### `namespace`

```typescript
const b = bem("block", { namespace: "ns" });

b();
//=> "ns-block"

b("element", { mod1: true, mod2: true });
//=> "ns-block__element ns-block__element--mod1 ns-block__element--mod2"
```

```typescript
const b = bem("block", { namespace: ["ns1", "ns2"] });

b();
//=> "ns1-ns2-block"

b("element", { mod1: true, mod2: true });
//=> "ns1-ns2-block__element ns1-ns2-block__element--mod1 ns1-ns2-block__element--mod2"
```

#### `namespaceDelimiter`

```typescript
const b = bem("block", { namespace: "ns", namespaceDelimiter: "---" });

b();
//=> "ns---block"

b("element", { mod1: true, mod2: true });
//=> "ns---block__element ns---block__element--mod1 ns---block__element--mod2"
```

When `namespace` is not given, `namespaceDelimiter` will be ignored.

```typescript
const b = bem("block", { namespaceDelimiter: "---" });

b();
//=> "block"

b("element", { mod1: true, mod2: true });
//=> "block__element block__element--mod1 block__element--mod2"
```

#### `strict`

When you set `true` to this option, given elements or modifiers are checked. And if the check fails, then a runtime error is thrown.

For example, when setting `true`, the following code throws an error.

```typescript
const b = bem("foo", { strict: true });
b("element__");
b({ modifier--: true });
```

When setting `false`, the following code throws no errors.

```typescript
const b = bem("foo", { strict: false });
b("element__");
//=> foo__element__
b({ modifier_: true });
//=> foo__modifier_
```

### `setup()`

The `setup()` function can change the default options.

```typescript
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

## License

[MIT](LICENSE) © Masafumi Koba
