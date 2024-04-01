import { describe, test, expect } from "vitest";

import bem, { setup } from "./index";

const testCases = [
  {
    description: "default",
    tested: () => bem("block"),
    expectations: [
      "block",
      "block block--mod1",
      "block block--mod1 block--mod2",
      "block__element",
      "block__element block__element--mod1",
      "block__element block__element--mod1 block__element--mod2",
    ],
  },
  {
    description: "`elementDelimiter` option",
    tested: () => bem("block", { elementDelimiter: "_" }),
    expectations: [
      "block",
      "block block--mod1",
      "block block--mod1 block--mod2",
      "block_element",
      "block_element block_element--mod1",
      "block_element block_element--mod1 block_element--mod2",
    ],
  },
  {
    description: "`modifierDelimiter` option",
    tested: () => bem("block", { modifierDelimiter: "-" }),
    expectations: [
      "block",
      "block block-mod1",
      "block block-mod1 block-mod2",
      "block__element",
      "block__element block__element-mod1",
      "block__element block__element-mod1 block__element-mod2",
    ],
  },
  {
    description: "`namespace` option",
    tested: () => bem("block", { namespace: "ns" }),
    expectations: [
      "ns-block",
      "ns-block ns-block--mod1",
      "ns-block ns-block--mod1 ns-block--mod2",
      "ns-block__element",
      "ns-block__element ns-block__element--mod1",
      "ns-block__element ns-block__element--mod1 ns-block__element--mod2",
    ],
  },
  {
    description: "`namespace` option (array)",
    tested: () => bem("block", { namespace: ["ns1", "ns2"] }),
    expectations: [
      "ns1-ns2-block",
      "ns1-ns2-block ns1-ns2-block--mod1",
      "ns1-ns2-block ns1-ns2-block--mod1 ns1-ns2-block--mod2",
      "ns1-ns2-block__element",
      "ns1-ns2-block__element ns1-ns2-block__element--mod1",
      "ns1-ns2-block__element ns1-ns2-block__element--mod1 ns1-ns2-block__element--mod2",
    ],
  },
  {
    description: "`namespace` option (empty array)",
    tested: () => bem("block", { namespace: [] }),
    expectations: [
      "block",
      "block block--mod1",
      "block block--mod1 block--mod2",
      "block__element",
      "block__element block__element--mod1",
      "block__element block__element--mod1 block__element--mod2",
    ],
  },
  {
    description: "`namespaceDelimiter` option",
    tested: () => bem("block", { namespace: "ns", namespaceDelimiter: "---" }),
    expectations: [
      "ns---block",
      "ns---block ns---block--mod1",
      "ns---block ns---block--mod1 ns---block--mod2",
      "ns---block__element",
      "ns---block__element ns---block__element--mod1",
      "ns---block__element ns---block__element--mod1 ns---block__element--mod2",
    ],
  },
  {
    description: "`namespaceDelimiter` option without `namespace` option",
    tested: () => bem("block", { namespaceDelimiter: "---" }),
    expectations: [
      "block",
      "block block--mod1",
      "block block--mod1 block--mod2",
      "block__element",
      "block__element block__element--mod1",
      "block__element block__element--mod1 block__element--mod2",
    ],
  },
  {
    description: "`setup()`",
    tested: () => {
      setup({
        elementDelimiter: "_",
        modifierDelimiter: "-",
        namespace: "ns",
        namespaceDelimiter: "---",
        strict: true,
      });
      return bem("block");
    },
    expectations: [
      "ns---block",
      "ns---block ns---block-mod1",
      "ns---block ns---block-mod1 ns---block-mod2",
      "ns---block_element",
      "ns---block_element ns---block_element-mod1",
      "ns---block_element ns---block_element-mod1 ns---block_element-mod2",
    ],
  },
];

testCases.forEach(({ description, tested, expectations }) => {
  describe(description, () => {
    const b = tested();
    const [block, blockMod1, blockMod2, element, elementMod1, elementMod2] = expectations;

    test("returns block", () => {
      expect(b()).toEqual(block);
      expect(b({ mod1: false })).toEqual(block);
      expect(b({ mod1: null })).toEqual(block);
      expect(b({ mod1: undefined })).toEqual(block);
      expect(b({ mod1: false, mod2: false, mod3: null, mod4: undefined })).toEqual(block);
      expect(b([])).toEqual(block);
      expect(b([""])).toEqual(block);
      expect(b([null])).toEqual(block);
      expect(b([undefined])).toEqual(block);
      expect(b(["", null, undefined])).toEqual(block);
    });

    test("returns block with modifier", () => {
      expect(b({ mod1: true })).toEqual(blockMod1);
      expect(b({ mod1: true, mod2: false, mod3: null, mod4: undefined })).toEqual(blockMod1);
      expect(b(["mod1"])).toEqual(blockMod1);
      expect(b(["mod1", "", null, undefined])).toEqual(blockMod1);
    });

    test("returns block with multiple modifiers", () => {
      expect(b({ mod1: true, mod2: true })).toEqual(blockMod2);
      expect(b({ mod1: true, mod2: true, mod3: false })).toEqual(blockMod2);
      expect(b(["mod1", "mod2"])).toEqual(blockMod2);
      expect(b(["mod1", "mod2", null])).toEqual(blockMod2);
    });

    test("returns block with element", () => {
      expect(b("element")).toEqual(element);
      expect(b("element", {})).toEqual(element);
      expect(b("element", { mod: false })).toEqual(element);
      expect(b("element", [""])).toEqual(element);
    });

    test("returns block with element and modifier", () => {
      expect(b("element", { mod1: true })).toEqual(elementMod1);
      expect(b("element", { mod1: true, mod2: false })).toEqual(elementMod1);
      expect(b("element", ["mod1"])).toEqual(elementMod1);
      expect(b("element", ["mod1", null])).toEqual(elementMod1);
    });

    test("returns block with element and multiple modifiers", () => {
      expect(b("element", { mod1: true, mod2: true })).toEqual(elementMod2);
      expect(b("element", { mod1: true, mod2: true, mod3: false })).toEqual(elementMod2);
      expect(b("element", ["mod1", "mod2"])).toEqual(elementMod2);
    });
  });
});

describe("invalid arguments", () => {
  const b = bem("invalid", {
    namespaceDelimiter: "-",
    elementDelimiter: "__",
    modifierDelimiter: "--",
  });

  const expectedError = (subject: string, value: string): string =>
    `The ${subject} ("${value}") must not use the characters contained within the delimiters ("-", "__", "--").`;

  test("element is invalid", () => {
    expect(() => b("element--")).toThrow(expectedError("element", "element--"));
    expect(() => b("element_")).toThrow(expectedError("element", "element_"));
    expect(() => b("---element")).toThrow(expectedError("element", "---element"));
    expect(() => b("-_element")).toThrow(expectedError("element", "-_element"));
    expect(() => b("ele-me_nt")).toThrow(expectedError("element", "ele-me_nt"));
  });

  test("modifier is invalid", () => {
    expect(() => b(["modifier--"])).toThrow(expectedError("modifier", "modifier--"));
    expect(() => b(["modifier_"])).toThrow(expectedError("modifier", "modifier_"));
    expect(() => b(["---modifier"])).toThrow(expectedError("modifier", "---modifier"));
    expect(() => b(["-_modifier"])).toThrow(expectedError("modifier", "-_modifier"));
    expect(() => b(["mod-ifi_er"])).toThrow(expectedError("modifier", "mod-ifi_er"));
  });
});

// `setup()` test must be at last
describe("`setup()` additional case", () => {
  test("overrides options which was setup", () => {
    const b = bem("block", {
      elementDelimiter: ":",
      modifierDelimiter: "/",
      namespace: "n",
      namespaceDelimiter: "=",
      strict: false,
    });
    expect(b("element:", { mod: true })).toEqual("n=block:element: n=block:element:/mod");
  });

  test("has no effect when empty options are passed", () => {
    setup({});
    expect(bem("block")("element", { mod: true })).toEqual(
      "ns---block_element ns---block_element-mod",
    );
  });
});
