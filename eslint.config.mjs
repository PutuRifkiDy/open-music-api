import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
];