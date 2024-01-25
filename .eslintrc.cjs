module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    greasemonkey: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
  globals: {
    // FROM FORUM WEB
    $: "readonly",
    XenForo: "readonly",
    // WEBPACK ENV
    DEV_MODE: "readonly",
    AVAILABLED_LANGS: "readonly",
  },
}
