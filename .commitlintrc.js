module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "scope-enum": [2, "always", ["deps", "readme", "demo", "release", "travis", "sideci"]],
  },
};
