type Modifiers = { [key: string]: boolean; };

export default function bem(
  block: string,
  { elementDelimiter = "__", modifierDelimiter =  "--", prefix = "" } = {},
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
