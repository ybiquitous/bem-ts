type Modifiers = { [key: string]: boolean; };

export default function bem(
  block: string,
  { elementDelimiter = "__", modifierDelimiter =  "--" } = {},
) {
  return (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => {
    if (!elementOrModifiers) {
      return block;
    }

    let base = block;
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
