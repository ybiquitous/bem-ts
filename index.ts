type Modifiers = { [key: string]: boolean; };

const defaults = {
  elementDelimiter: "__",
  modifierDelimiter:  "--",
  prefix: "",
};

export function setup(options: { elementDelimiter?: string, modifierDelimiter?: string, prefix?: string }) {
  if (options.elementDelimiter) {
    defaults.elementDelimiter = options.elementDelimiter;
  }
  if (options.modifierDelimiter) {
    defaults.modifierDelimiter = options.modifierDelimiter;
  }
  if (options.prefix) {
    defaults.prefix = options.prefix;
  }
}

export default function bem(
  block: string,
  {
    elementDelimiter = defaults.elementDelimiter,
    modifierDelimiter = defaults.modifierDelimiter,
    prefix = defaults.prefix,
  } = {},
) {
  return (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => {
    let base = `${prefix}${block}`;

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
      .filter((mod) => mods && mods[mod])
      .map((mod) => `${base}${modifierDelimiter}${mod}`)
      .join(" ");
  };
}
