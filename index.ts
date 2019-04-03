interface Options {
  elementDelimiter: string;
  modifierDelimiter: string;
  namespace: string | string[];
  namespaceDelimiter: string;
}

type PartialOptions = Partial<Options>;

const defaultOptions: Options = {
  elementDelimiter: "__",
  modifierDelimiter: "--",
  namespace: "",
  namespaceDelimiter: "-",
};

export function setup({
  elementDelimiter,
  modifierDelimiter,
  namespace,
  namespaceDelimiter,
}: PartialOptions): void {
  if (elementDelimiter) {
    defaultOptions.elementDelimiter = elementDelimiter;
  }
  if (modifierDelimiter) {
    defaultOptions.modifierDelimiter = modifierDelimiter;
  }
  if (namespace) {
    defaultOptions.namespace = namespace;
  }
  if (namespaceDelimiter) {
    defaultOptions.namespaceDelimiter = namespaceDelimiter;
  }
}

type Modifiers =
  | {
      [key: string]: boolean | null | undefined;
    }
  | (string | null | undefined)[];

type BemBlockFunction = (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => string;

export default function bem(block: string, options: PartialOptions = {}): BemBlockFunction {
  const { elementDelimiter, modifierDelimiter, namespace, namespaceDelimiter } = {
    ...defaultOptions,
    ...options,
  };

  const namespaces = ([] as string[])
    .concat(namespace)
    .filter(Boolean) // compact
    .reduce((joined, ns) => joined + `${ns}${namespaceDelimiter}`, "");

  const baseBlock = `${namespaces}${block}`;

  return function bemBlock(elementOrModifiers, modifiers) {
    if (!elementOrModifiers) {
      return baseBlock;
    }

    const base =
      typeof elementOrModifiers === "string"
        ? `${baseBlock}${elementDelimiter}${elementOrModifiers}`
        : baseBlock;
    const mods = typeof elementOrModifiers === "string" ? modifiers : elementOrModifiers;

    if (!mods) {
      return base;
    }

    const reducer = (result: string, modifier: string | null | undefined): string =>
      modifier ? `${result} ${base}${modifierDelimiter}${modifier}` : result;

    if (Array.isArray(mods)) {
      return mods.reduce(reducer, base);
    }

    return Object.keys(mods)
      .filter(mod => mods[mod])
      .reduce(reducer, base);
  };
}
