type Modifiers = { [key: string]: boolean; }

const defaults = {
  elementDelimiter: '__',
  modifierDelimiter:  '--',
  namespace: '',
  namespaceDelimiter: '-',
  prefix: '',
}

export function setup(options: {
  elementDelimiter?: string,
  modifierDelimiter?: string,
  namespace?: string,
  namespaceDelimiter?: string,
  prefix?: string,
}) {
  if (typeof options.elementDelimiter === 'string') {
    defaults.elementDelimiter = options.elementDelimiter
  }
  if (typeof options.modifierDelimiter === 'string') {
    defaults.modifierDelimiter = options.modifierDelimiter
  }
  if (typeof options.namespace === 'string') {
    defaults.namespace = options.namespace
  }
  if (typeof options.namespaceDelimiter === 'string') {
    defaults.namespaceDelimiter = options.namespaceDelimiter
  }
  if (typeof options.prefix === 'string') {
    defaults.prefix = options.prefix
  }
}

export default function bem(
  block: string,
  {
    elementDelimiter = defaults.elementDelimiter,
    modifierDelimiter = defaults.modifierDelimiter,
    namespace = defaults.namespace,
    namespaceDelimiter = defaults.namespaceDelimiter,
    prefix = defaults.prefix,
  } = {},
) {
  return (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => {
    if (namespace && prefix) {
      throw new TypeError(`prefix('${prefix}') is deprecated. Use namespace('${namespace}') instead.`)
    }

    const nsDelim = namespace ? namespaceDelimiter : ''
    const pre = prefix || `${namespace}${nsDelim}`
    let base = `${pre}${block}`

    if (!elementOrModifiers) {
      return base
    }

    let mods = modifiers

    if (typeof elementOrModifiers === 'string') {
      base = `${base}${elementDelimiter}${elementOrModifiers}`
    } else {
      mods = elementOrModifiers
    }

    if (!mods) {
      return base
    }

    return Object.keys(mods)
      .filter((mod) => mods && mods[mod])
      .map((mod) => `${base}${modifierDelimiter}${mod}`)
      .join(' ')
  }
}
