module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'sort-exports', 'import', 'prettier', '@tanstack/query'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect',
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'storybook-static/',
    '!.storybook',
    'vitest.setup.ts',
    'vitest.global.setup.ts',
    'vitest.config.ts',
    'vite.config.ts',
    'vite-env.d.ts',
    'create-component.js',
    'plugins',
    'index.html',
    '.eslintrc.cjs',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'off',
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['variable', 'parameter'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // для констант
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'forbid',
      },
      // для react компонентов
      {
        selector: 'variable',
        modifiers: ['const'],
        types: ['function'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'forbid',
      },
      // для react компонентов в качестве параметра
      {
        selector: 'parameter',
        types: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': ['error', { ignore: ['\\.svg\\?react$'] }],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-unused-prop-types': 'warn',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'arrow-body-style': ['error', 'as-needed'],
    curly: 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'max-classes-per-file': ['error', 1],
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-duplicate-imports': 0,
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-invalid-this': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'axios',
            importNames: ['isAxiosError'],
            message: "Please import { isAxiosError } from '@/shared/helpers' instead.",
          },
        ],
      },
    ],
    'no-return-await': 'error',
    'no-shadow': 'off',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'no-param-reassign': ['error'],
    'spaced-comment': 'error',
    radix: 'error',
    'import/export': 0,
    'import/no-cycle': 2,
    'import/no-duplicates': 2,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'prefer-template': 'error',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: '{.,..}/**/*.styles',
            group: 'sibling',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'sort-exports/sort-exports': [
      'error',
      {
        ignoreCase: true,
        sortExportKindFirst: 'type',
        pattern: '**/index.ts',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
      },
    },
    {
      files: ['*.spec.*'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.stories.tsx'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
