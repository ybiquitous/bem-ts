type Options = {
  /**
   * A delimiter to split a BEM element. Defaults to `"__"`.
   */
  elementDelimiter: string;

  /**
   * A delimiter to split a BEM modifier. Defaults to `"--"`.
   */
  modifierDelimiter: string;

  /**
   * A namespace to prepend a BEM block. Defaults to `""`.
   */
  namespace: string | string[];

  /**
   * A delimiter to split a namespace. Defaults to `"-"`.
   */
  namespaceDelimiter: string;

  /**
   * A flag to force a BEM convention. Defaults to `true`.
   */
  strict: boolean;
};

type PartialOptions = Partial<Options>;

const defaultOptions: Options = {
  elementDelimiter: "__",
  modifierDelimiter: "--",
  namespace: "",
  namespaceDelimiter: "-",
  strict: true,
};

/**
 * Set up the default options.
 *
 * @param options - Options to control a generated class name.
 */
export function setup({
  elementDelimiter,
  modifierDelimiter,
  namespace,
  namespaceDelimiter,
  strict,
}: PartialOptions): void {
  if (typeof elementDelimiter === "string") {
    defaultOptions.elementDelimiter = elementDelimiter;
  }
  if (typeof modifierDelimiter === "string") {
    defaultOptions.modifierDelimiter = modifierDelimiter;
  }
  if (typeof namespace === "string" || Array.isArray(namespace)) {
    defaultOptions.namespace = namespace;
  }
  if (typeof namespaceDelimiter === "string") {
    defaultOptions.namespaceDelimiter = namespaceDelimiter;
  }
  if (typeof strict === "boolean") {
    defaultOptions.strict = strict;
  }
}

/**
 * BEM modifiers.
 */
type Modifiers = Record<string, boolean | null | undefined> | Array<string | null | undefined>;

/**
 * A function to generate a BEM class name.
 *
 * @param elementOrModifiers - A BEM element or modifiers.
 * @param modifiers - BEM modifiers.
 * @returns A generated class name.
 */
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

/**
 * Creates a function to generate a BEM class name.
 *
 * @param block - A BEM block name.
 * @param options - Options to control a generated class name.
 * @returns A function to generate a BEM class name.
 */
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
    if (elementOrModifiers == null) {
      return namespaceBlock;
    }

    const element = typeof elementOrModifiers === "string" ? elementOrModifiers : null;

    if (strict && element != null && includesChars(element, delimiterChars)) {
      throw new Error(invalidMessage("element", element, delimiters));
    }

    const base =
      element == null ? namespaceBlock : `${namespaceBlock}${elementDelimiter}${element}`;

    const mods = typeof elementOrModifiers === "string" ? modifiers : elementOrModifiers;

    if (mods == null) {
      return base;
    }

    const addModifiers = (className: string, modifier: string | null | undefined): string => {
      if (modifier != null && modifier !== "") {
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
      .filter((mod) => Boolean(mods[mod]))
      .reduce(addModifiers, base);
  };
}
