import block from ".";

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
