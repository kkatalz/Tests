import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const config = await tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  rules: {
    semi: ['error', 'always'],
  },
});

export default config;
