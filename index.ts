const defaults = {
  elementDelimiter: "__",
  modifierDelimiter: "--",
  namespace: "",
  namespaceDelimiter: "-",
};

export function setup(options: Partial<typeof defaults>) {
  if (typeof options.elementDelimiter === "string") {
    defaults.elementDelimiter = options.elementDelimiter;
  }
  if (typeof options.modifierDelimiter === "string") {
    defaults.modifierDelimiter = options.modifierDelimiter;
  }
  if (typeof options.namespace === "string") {
    defaults.namespace = options.namespace;
  }
  if (typeof options.namespaceDelimiter === "string") {
    defaults.namespaceDelimiter = options.namespaceDelimiter;
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
