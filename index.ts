const defaults = {
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
}: Partial<typeof defaults>) {
  if (elementDelimiter) {
    defaults.elementDelimiter = elementDelimiter;
  }
  if (modifierDelimiter) {
    defaults.modifierDelimiter = modifierDelimiter;
  }
  if (namespace) {
    defaults.namespace = namespace;
  }
  if (namespaceDelimiter) {
    defaults.namespaceDelimiter = namespaceDelimiter;
  }
}

type Modifiers = {
  [key: string]: boolean | null | undefined;
};

export default function bem(
  block: string,
  {
    elementDelimiter = defaults.elementDelimiter,
    modifierDelimiter = defaults.modifierDelimiter,
    namespace = defaults.namespace,
    namespaceDelimiter = defaults.namespaceDelimiter,
  } = {}
) {
  const nsDelim = namespace ? namespaceDelimiter : "";
  const baseBlock = `${namespace}${nsDelim}${block}`;

  return function bemBlock(elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) {
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
