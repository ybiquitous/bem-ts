module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'scope-enum': [
      2,
      'always',
      ['deps', 'readme', 'release', 'travis', 'sideci'],
    ],
  },
}
