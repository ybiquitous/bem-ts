type Modifiers = { [key: string]: boolean; };

export default function bem(block: string) {
  return (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => {
    if (!elementOrModifiers) {
      return block;
    }

    let base = block;
    let mods = modifiers;

    if (typeof elementOrModifiers === "string") {
      base = `${base}__${elementOrModifiers}`;
    } else {
      mods = elementOrModifiers;
    }

    if (!mods) {
      return base;
    }

    return Object.keys(mods)
      .filter((mod) => mods && mods[mod])
      .map((mod) => `${base}--${mod}`)
      .join(" ");
  };
}
