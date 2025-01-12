module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:@next/next/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: [
    "@stylistic",
    "unused-imports",
    "no-relative-import-paths",
    "import",
    "react",
    "tailwindcss",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json"],
      },
    },
    "jsx-a11y": {
      components: {
        Button: "button",
        Link: "a",
      },
    },
    tailwindcss: {
      callees: ["twMerge", "clsx", "cn", "cva"],
    },
  },
  overrides: [
    {
      files: ["src/**/*.tsx"],
      excludedFiles: ["src/app/_components/ui/*"],
      rules: {
        "import/prefer-default-export": [
          "error",
          {
            target: "any",
          },
        ],
      },
    },
  ],
  rules: {
    // airbnb-typescript
    // Disabling these rules is required since typescript-eslint v8
    "@typescript-eslint/brace-style": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/comma-spacing": "off",
    "@typescript-eslint/func-call-spacing": "off",
    "@typescript-eslint/keyword-spacing": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/space-before-blocks": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/space-infix-ops": "off",
    "@typescript-eslint/object-curly-spacing": "off",

    // @stylistic
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],

    // eslint
    "arrow-body-style": "off",
    curly: "error",
    "max-classes-per-file": "off",
    "no-console": "warn",
    "no-empty-function": [
      "error",
      {
        allow: ["constructors"],
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "next/link",
            message: `Please use import { Link } from '@/i18n/routing' instead.`,
          },
          {
            name: "next/navigation",
            importNames: [
              "redirect",
              "useRouter",
              "usePathname",
              "getPathname",
            ],
            message: `Please use import { Link, redirect, useRouter, usePathname, getPathname } from '@/i18n/routing' instead.`,
          },
        ],
      },
    ],
    radix: "off",

    // @typescript-eslint/eslint-plugin
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",

    // eslint-plugin-unused-imports
    "no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // eslint-plugin-no-relative-import-paths
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      {
        allowSameFolder: true,
        rootDir: "src",
        prefix: "@",
      },
    ],

    // eslint-plugin-import
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "{app,components,lib}{,/**}",
            group: "internal",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    "import/prefer-default-export": "off",

    // eslint-plugin-react
    "react/function-component-definition": "off",
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react/jsx-key": "error",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",

    // eslint-plugin-jsx-a11y
    "jsx-a11y/heading-has-content": "off",
  },
};
