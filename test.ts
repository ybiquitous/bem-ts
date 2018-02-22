import block, { setup } from '.'

const testCases = [
  {
    description: 'default',
    tested: () => block('block'),
    expectations: [
      'block',
      'block--mod1',
      'block--mod1 block--mod2',
      'block__element',
      'block__element--mod1',
      'block__element--mod1 block__element--mod2',
    ],
  },
  {
    description: '`elementDelimiter` option',
    tested: () => block('block', { elementDelimiter: '_' }),
    expectations: [
      'block',
      'block--mod1',
      'block--mod1 block--mod2',
      'block_element',
      'block_element--mod1',
      'block_element--mod1 block_element--mod2',
    ],
  },
  {
    description: '`modifierDelimiter` option',
    tested: () => block('block', { modifierDelimiter: '-' }),
    expectations: [
      'block',
      'block-mod1',
      'block-mod1 block-mod2',
      'block__element',
      'block__element-mod1',
      'block__element-mod1 block__element-mod2',
    ],
  },
  {
    description: '`namespace` option',
    tested: () => block('block', { namespace: 'ns' }),
    expectations: [
      'ns-block',
      'ns-block--mod1',
      'ns-block--mod1 ns-block--mod2',
      'ns-block__element',
      'ns-block__element--mod1',
      'ns-block__element--mod1 ns-block__element--mod2',
    ],
  },
  {
    description: '`namespaceDelimiter` option',
    tested: () => block('block', { namespace: 'ns', namespaceDelimiter: '---' }),
    expectations: [
      'ns---block',
      'ns---block--mod1',
      'ns---block--mod1 ns---block--mod2',
      'ns---block__element',
      'ns---block__element--mod1',
      'ns---block__element--mod1 ns---block__element--mod2',
    ],
  },
  {
    description: '`namespaceDelimiter` option without `namespace` option',
    tested: () => block('block', { namespaceDelimiter: '---' }),
    expectations: [
      'block',
      'block--mod1',
      'block--mod1 block--mod2',
      'block__element',
      'block__element--mod1',
      'block__element--mod1 block__element--mod2',
    ],
  },
  {
    description: '`prefix` option',
    tested: () => block('block', { prefix: 'pre---' }),
    expectations: [
      'pre---block',
      'pre---block--mod1',
      'pre---block--mod1 pre---block--mod2',
      'pre---block__element',
      'pre---block__element--mod1',
      'pre---block__element--mod1 pre---block__element--mod2',
    ],
  },
  {
    description: '`setup()`',
    tested: () => {
      setup({
        elementDelimiter: '_',
        modifierDelimiter: '-',
        namespace: 'ns',
        namespaceDelimiter: '---',
        // prefix: 'pre---',
      })
      return block('block')
    },
    expectations: [
      'ns---block',
      'ns---block-mod1',
      'ns---block-mod1 ns---block-mod2',
      'ns---block_element',
      'ns---block_element-mod1',
      'ns---block_element-mod1 ns---block_element-mod2',
    ],
  },
]

testCases.forEach(({ description, tested, expectations }) => {
  describe(description, () => {
    const b = tested()

    it('returns block', () => {
      expect(b()).toBe(expectations[0])
    })

    it('returns block with modifier', () => {
      expect(b({ mod1: true })).toBe(expectations[1])
      expect(b({ mod1: true, mod2: false })).toBe(expectations[1])
    })

    it('returns block with multiple modifiers', () => {
      expect(b({ mod1: true, mod2: true })).toBe(expectations[2])
      expect(b({ mod1: true, mod2: true, mod3: false })).toBe(expectations[2])
    })

    it('returns block with element', () => {
      expect(b('element')).toBe(expectations[3])
    })

    it('returns block with element and modifier', () => {
      expect(b('element', { mod1: true })).toBe(expectations[4])
      expect(b('element', { mod1: true, mod2: false })).toBe(expectations[4])
    })

    it('returns block with element and multiple modifiers', () => {
      expect(b('element', { mod1: true, mod2: true })).toBe(expectations[5])
      expect(b('element', { mod1: true, mod2: true, mod3: false })).toBe(expectations[5])
    })
  })
})

describe('`namespace` and `prefix` at the same time', () => {
  it('throws `TypeError`', () => {
    const b = block('block', { namespace: 'ns', prefix: 'pre' })
    expect(() => b()).toThrow(TypeError)
    expect(() => b()).toThrow("prefix('pre') is deprecated. Use namespace('ns') instead.")
  })
})

// `setup()` test must be at last
describe('`setup()` additional case', () => {
  it('overrides options which was setup', () => {
    const b = block('block', {
      elementDelimiter: ':',
      modifierDelimiter: '/',
      namespace: 'n',
      namespaceDelimiter: '=',
    })
    expect(b('element', { mod: true })).toBe('n=block:element/mod')
  })

  it('has no effect when empty options are passed', () => {
    setup({})
    expect(block('block')('element', { mod: true })).toBe('ns---block_element-mod')
  })

  it('`prefix` option [deprecated]', () => {
    setup({ prefix: 'pre:', namespace: '' })
    expect(block('block')('element', { mod: true })).toBe('pre:block_element-mod')
  })
})
