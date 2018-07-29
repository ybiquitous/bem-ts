import * as test from "tape";
import block, { setup } from "./index";

const testCases = [
  {
    description: "default",
    tested: () => block("block"),
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
    tested: () => block("block", { elementDelimiter: "_" }),
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
    tested: () => block("block", { modifierDelimiter: "-" }),
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
    tested: () => block("block", { namespace: "ns" }),
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
    description: "`namespaceDelimiter` option",
    tested: () => block("block", { namespace: "ns", namespaceDelimiter: "---" }),
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
    tested: () => block("block", { namespaceDelimiter: "---" }),
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
      });
      return block("block");
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
  test(description, t => {
    const b = tested();

    t.test("returns block", assert => {
      assert.is(b(), expectations[0]);
      assert.is(b({ mod1: false }), expectations[0]);
      assert.is(b({ mod1: false, mod2: false }), expectations[0]);
      assert.end();
    });

    t.test("returns block with modifier", assert => {
      assert.is(b({ mod1: true }), expectations[1]);
      assert.is(b({ mod1: true, mod2: false }), expectations[1]);
      assert.is(b({ mod1: true, mod2: null }), expectations[1]);
      assert.is(b({ mod1: true, mod2: undefined }), expectations[1]);
      assert.end();
    });

    t.test("returns block with multiple modifiers", assert => {
      assert.is(b({ mod1: true, mod2: true }), expectations[2]);
      assert.is(b({ mod1: true, mod2: true, mod3: false }), expectations[2]);
      assert.end();
    });

    t.test("returns block with element", assert => {
      assert.is(b("element"), expectations[3]);
      assert.end();
    });

    t.test("returns block with element and modifier", assert => {
      assert.is(b("element", { mod1: true }), expectations[4]);
      assert.is(b("element", { mod1: true, mod2: false }), expectations[4]);
      assert.end();
    });

    t.test("returns block with element and multiple modifiers", assert => {
      assert.is(b("element", { mod1: true, mod2: true }), expectations[5]);
      assert.is(b("element", { mod1: true, mod2: true, mod3: false }), expectations[5]);
      assert.end();
    });
  });
});

// `setup()` test must be at last
test("`setup()` additional case", t => {
  t.test("overrides options which was setup", assert => {
    const b = block("block", {
      elementDelimiter: ":",
      modifierDelimiter: "/",
      namespace: "n",
      namespaceDelimiter: "=",
    });
    assert.is(b("element", { mod: true }), "n=block:element n=block:element/mod");
    assert.end();
  });

  t.test("has no effect when empty options are passed", assert => {
    setup({});
    assert.is(
      block("block")("element", { mod: true }),
      "ns---block_element ns---block_element-mod"
    );
    assert.end();
  });
});
