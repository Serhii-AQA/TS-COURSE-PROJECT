import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            '**/node_modules',
            '**/test-results/',
            'playwright-report/',
            'utils/gmailAuth.util.ts',
            'utils/slack-nnotification.util.ts',
            'test-data/marketplace/hoteliersData.ts',
            '**/sandbox.test.ts',
            '**/.HARs',
        ],
    },
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'script',
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['eslint.config.mjs'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            // Disable the problematic rule
            '@typescript-eslint/no-unused-expressions': 'off',

            // 'no-unused-vars': 'warn',

            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: true,
                },
            ],

            eqeqeq: 'error',
            'linebreak-style': 0,

            'max-len': [
                'error',
                {
                    code: 150,
                },
            ],

            'no-console': 'error',
            'no-debugger': 'error',
            'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],

            'no-tabs': [
                'error',
                {
                    allowIndentationTabs: true,
                },
            ],

            'object-curly-spacing': ['error', 'always'],

            quotes: [
                2,
                'single',
                {
                    avoidEscape: true,
                },
            ],

            semi: ['error', 'always'],
        }
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            // Customize Playwright rules
            // ...
        },
    },
);