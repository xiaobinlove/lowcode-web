module.exports = {
    env: {
        node: true,
        es2021: true,
        browser: true
    },
    extends: [
        'standard',
        'standard-jsx'
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        // 自定义规则
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off'
    }
}