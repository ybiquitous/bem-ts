interface Options {
  elementDelimiter: string;
  modifierDelimiter: string;
  namespace: string | string[];
  namespaceDelimiter: string;
  strict: boolean;
}

type PartialOptions = Partial<Options>;

const defaultOptions: Options = {
  elementDelimiter: "__",
  modifierDelimiter: "--",
  namespace: "",
  namespaceDelimiter: "-",
  strict: true,
};

export function setup({
  elementDelimiter,
  modifierDelimiter,
  namespace,
  namespaceDelimiter,
  strict,
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
  if (typeof strict === "boolean") {
    defaultOptions.strict = strict;
  }
}

type Modifiers =
  | {
      [key: string]: boolean | null | undefined;
    }
  | (string | null | undefined)[];

type BemBlockFunction = (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => string;

const uniqueChars = (list: string[]): string[] =>
  list
    .join("")
    .split("")
    .filter((value, index, self) => self.indexOf(value) === index);

const includesChars = (str: string, chars: string[]): boolean =>
  chars.some((char) => str.includes(char));

const invalidMessage = (subject: string, subjectValue: string, delimiters: string[]): string => {
  const delims = `"${delimiters.join('", "')}"`;
  return `The ${subject} ("${subjectValue}") must not use the characters contained within the delimiters (${delims}).`;
};

export default function bem(block: string, options: PartialOptions = {}): BemBlockFunction {
  const { elementDelimiter, modifierDelimiter, namespace, namespaceDelimiter, strict } = {
    ...defaultOptions,
    ...options,
  };

  const namespaces = ([] as string[])
    .concat(namespace)
    .filter(Boolean) // compact
    .reduce((joined, ns) => `${joined}${ns}${namespaceDelimiter}`, "");

  const namespaceBlock = `${namespaces}${block}`;

  const delimiters = strict ? [namespaceDelimiter, elementDelimiter, modifierDelimiter] : [];
  const delimiterChars = strict ? uniqueChars(delimiters) : [];

  return function bemBlock(elementOrModifiers, modifiers) {
    if (!elementOrModifiers) {
      return namespaceBlock;
    }

    const element = typeof elementOrModifiers === "string" ? elementOrModifiers : null;

    if (strict && element && includesChars(element, delimiterChars)) {
      throw new Error(invalidMessage("element", element, delimiters));
    }

    const base = element ? `${namespaceBlock}${elementDelimiter}${element}` : namespaceBlock;

    const mods = typeof elementOrModifiers === "string" ? modifiers : elementOrModifiers;

    if (!mods) {
      return base;
    }

    const addModifiers = (className: string, modifier: string | null | undefined): string => {
      if (modifier) {
        if (strict && includesChars(modifier, delimiterChars)) {
          throw new Error(invalidMessage("modifier", modifier, delimiters));
        }
        return `${className} ${base}${modifierDelimiter}${modifier}`;
      }
      return className;
    };

    if (Array.isArray(mods)) {
      return mods.reduce(addModifiers, base);
    }

    return Object.keys(mods)
      .filter((mod) => mods[mod])
      .reduce(addModifiers, base);
  };
}
