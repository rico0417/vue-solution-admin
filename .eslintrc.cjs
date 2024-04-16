/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
// eslint:recommended：该配置集是ESlint内置的“推荐”，它打开一组小的、合理的规则，用于检查众所周知的最佳实践
// @typescript-eslint/recommended：该配置集是typescript-eslint的推荐，它与eslint:recommended相似，但它启用了特定于ts的规则
// @typescript-eslint/eslint-recommended：该配置集禁用eslint:recommended配置集中已经由typescript处理的规则，防止eslint和typescript之间的冲突
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  rule: {
    'vue/multi-word-component-names': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['@typescript-eslint']
}
