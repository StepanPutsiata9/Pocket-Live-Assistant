const path = require('path');
const js = require('@eslint/js');
const globals = require('globals');

const reactNativeConfig = require('@react-native/eslint-config/flat');

const eslintConfigPrettier = require('eslint-config-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const importPlugin = require('eslint-plugin-import');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const babelParser = require('@babel/eslint-parser');

const noUnusedVars = {
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
};

const mobileReactNativeConfig = reactNativeConfig.map(config =>
  config.files
    ? { ...config, files: config.files.map(pattern => `mobile/${pattern}`) }
    : { ...config, files: ['mobile/**'] },
);

module.exports = [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/*.config.js',
      '**/*.config.ts',
      '.prettierrc.*',
      '**/app.json',
      'mobile/android/**',
      'mobile/ios/**',
    ],
  },

  js.configs.recommended,

  ...mobileReactNativeConfig,

  {
    files: ['mobile/**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true,
        babelOptions: {
          configFile: path.resolve(__dirname, 'mobile/babel.config.js'),
        },
      },
    },
  },

  {
    // eslint-plugin-ft-flow is bundled in the RN preset to lint Flow type
    // annotations, but it calls context.getAllComments() — an API removed in
    // ESLint 9 — so it crashes on load. This app is TypeScript (no Flow), so we
    // disable the Flow rules. Scoped to mobile/**/*.js because that is the only
    // place the RN preset registers ft-flow.
    files: ['mobile/**/*.js'],
    rules: {
      'ft-flow/define-flow-type': 'off',
      'ft-flow/use-flow-type': 'off',
    },
  },
  {
    files: ['mobile/**/*.{ts,tsx}'],
    rules: { ...noUnusedVars },
  },

  {
    files: ['server/**/*.{js,ts}'],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { '@typescript-eslint': typescriptPlugin },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...noUnusedVars,
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            path.resolve(__dirname, 'mobile/tsconfig.json'),
            path.resolve(__dirname, 'server/tsconfig.json'),
          ],
        },
        node: true,
      },
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^@/'],
            ['^'],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-unresolved': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
      curly: ['warn', 'all'],
      'no-throw-literal': 'warn',
      'no-return-await': 'warn',
      'no-unused-vars': 'off',
    },
  },

  eslintConfigPrettier,
];
