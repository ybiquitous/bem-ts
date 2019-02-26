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

interface Modifiers {
  [key: string]: boolean | null | undefined;
}

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
    let base = baseBlock;

    if (!elementOrModifiers) {
      return base;
    }

    let mods = modifiers;

    if (typeof elementOrModifiers === "string") {
      base = `${base}${elementDelimiter}${elementOrModifiers}`;
    } else {
      mods = elementOrModifiers;
    }

    if (!mods) {
      return base;
    }

    return Object.keys(mods)
      .filter(mod => (mods as Modifiers)[mod])
      .reduce((result, mod) => `${result} ${base}${modifierDelimiter}${mod}`, base);
  };
}
