import block, { setup } from ".";

describe("default", () => {
  const b = block("block");

  it("returns block", () => {
    expect(b()).toBe("block");
  });

  it("returns block with modifier", () => {
    expect(b({ a: true, b: false })).toBe("block--a");
  });

  it("returns block with multiple modifiers", () => {
    expect(b({ a: true, b: false, c: true })).toBe("block--a block--c");
  });

  it("returns block with element", () => {
    expect(b("element")).toBe("block__element");
  });

  it("returns block with element and modifier", () => {
    expect(b("element", { a: true, b: false })).toBe("block__element--a");
  });

  it("returns block with element and multiple modifiers", () => {
    expect(b("element", { a: true, b: false, c: true }))
      .toBe("block__element--a block__element--c");
  });
});

describe("`elementDelimiter` option", () => {
  const b = block("block", { elementDelimiter: "_" });

  it("returns block", () => {
    expect(b()).toBe("block");
  });

  it("returns block with modifier", () => {
    expect(b({ a: true, b: false })).toBe("block--a");
  });

  it("returns block with multiple modifiers", () => {
    expect(b({ a: true, b: false, c: true })).toBe("block--a block--c");
  });

  it("returns block with element", () => {
    expect(b("element")).toBe("block_element");
  });

  it("returns block with element and modifier", () => {
    expect(b("element", { a: true, b: false })).toBe("block_element--a");
  });

  it("returns block with element and multiple modifiers", () => {
    expect(b("element", { a: true, b: false, c: true }))
      .toBe("block_element--a block_element--c");
  });
});

describe("`modifierDelimiter` option", () => {
  const b = block("block", { modifierDelimiter: "-" });

  it("returns block", () => {
    expect(b()).toBe("block");
  });

  it("returns block with modifier", () => {
    expect(b({ a: true, b: false })).toBe("block-a");
  });

  it("returns block with multiple modifiers", () => {
    expect(b({ a: true, b: false, c: true })).toBe("block-a block-c");
  });

  it("returns block with element", () => {
    expect(b("element")).toBe("block__element");
  });

  it("returns block with element and modifier", () => {
    expect(b("element", { a: true, b: false })).toBe("block__element-a");
  });

  it("returns block with element and multiple modifiers", () => {
    expect(b("element", { a: true, b: false, c: true }))
      .toBe("block__element-a block__element-c");
  });
});

describe("`prefix` option", () => {
  const b = block("block", { prefix: "pre---" });

  it("returns block", () => {
    expect(b()).toBe("pre---block");
  });

  it("returns block with modifier", () => {
    expect(b({ a: true, b: false })).toBe("pre---block--a");
  });

  it("returns block with multiple modifiers", () => {
    expect(b({ a: true, b: false, c: true })).toBe("pre---block--a pre---block--c");
  });

  it("returns block with element", () => {
    expect(b("element")).toBe("pre---block__element");
  });

  it("returns block with element and modifier", () => {
    expect(b("element", { a: true, b: false })).toBe("pre---block__element--a");
  });

  it("returns block with element and multiple modifiers", () => {
    expect(b("element", { a: true, b: false, c: true }))
      .toBe("pre---block__element--a pre---block__element--c");
  });
});

describe("`setup()`", () => {
  setup({
    elementDelimiter: "_",
    modifierDelimiter: "-",
    prefix: "pre---",
  });

  const b = block("block");

  it("returns block", () => {
    expect(b()).toBe("pre---block");
  });

  it("returns block with modifier", () => {
    expect(b({ a: true, b: false })).toBe("pre---block-a");
  });

  it("returns block with multiple modifiers", () => {
    expect(b({ a: true, b: false, c: true })).toBe("pre---block-a pre---block-c");
  });

  it("returns block with element", () => {
    expect(b("element")).toBe("pre---block_element");
  });

  it("returns block with element and modifier", () => {
    expect(b("element", { a: true, b: false })).toBe("pre---block_element-a");
  });

  it("returns block with element and multiple modifiers", () => {
    expect(b("element", { a: true, b: false, c: true }))
      .toBe("pre---block_element-a pre---block_element-c");
  });

  it("overrides options which was setup", () => {
    const bl = block("block", { elementDelimiter: ":", modifierDelimiter: "/", prefix: "p-" });
    expect(bl("element", { a: true })).toBe("p-block:element/a");
  });

  it("has no effect when empty options are passed", () => {
    setup({});
    expect(block("block")("element", { a: true })).toBe("pre---block_element-a");
  });
});
