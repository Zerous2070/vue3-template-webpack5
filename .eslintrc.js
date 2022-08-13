module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
        'vue/setup-compiler-macros': true
    },
    parser: 'vue-eslint-parser',
    extends: ['plugin:vue/vue3-strongly-recommended', 'plugin:@typescript-eslint/recommended', 'standard', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'generator-star-spacing': 'off',
        'no-tabs': 'off',
        'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-import-assign': 'off',
        'no-multi-str': 'off',
        'one-var': [
            'error',
            {
                const: 'never'
            }
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['TemplateLiteral > *', 'ConditionalExpression *'],
                flatTernaryExpressions: true,
                offsetTernaryExpressions: true
            }
        ],
        semi: ['error', 'always'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'multiline-ternary': 'off',
        'prefer-template': 'error',
        'comma-dangle': 'off',
        'standard/computed-property-even-spacing': 'off',
        'dot-notation': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        'vue/no-html': 'off',

        // 模板中的变量禁止与前一个作用域重名
        'vue/no-template-shadow': 'error',

        // 校验命名规则，camelCase | kebab-case
        'vue/custom-event-name-casing': ['error', 'kebab-case'],

        // 自定义事件命名校验，always：kebab-case：never：camelCase
        'vue/v-on-event-hyphenation': ['error', 'always'],

        'vue/no-use-v-if-with-v-for': 'error',

        // 限制自定义组件属性风格，never：必须驼峰，always：必须短横线
        'vue/attribute-hyphenation': ['error', 'always']
    }
};
