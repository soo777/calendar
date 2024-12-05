module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "react", "react-hooks", "jsx-a11y"],
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-no-target-blank": 0,
    "react/no-unescaped-entities": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    "react/jsx-key": 0,
    "no-unused-vars": 0,
    eqeqeq: 0,
  },
};
