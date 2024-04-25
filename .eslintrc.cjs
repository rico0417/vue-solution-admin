/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
// eslint:recommended：该配置集是ESlint内置的“推荐”，它打开一组小的、合理的规则，用于检查众所周知的最佳实践
// @typescript-eslint/recommended：该配置集是typescript-eslint的推荐，它与eslint:recommended相似，但它启用了特定于ts的规则
// @typescript-eslint/eslint-recommended：该配置集禁用eslint:recommended配置集中已经由typescript处理的规则，防止eslint和typescript之间的冲突
// prettier（即eslint-config-prettier）关闭所有可能干扰Prettier规则的Eslint规则，确保将其放在最后，这样它有机会覆盖其他配置
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // 打开prettier插件提供的规则，该插件从 ESLint 内运行 Prettier
    // 关闭这两个 ESLint 核心规则，这两个规则和prettier插件一起使用会出现问题，具体可参阅
    // https://github.com/prettier/eslint-plugin-prettier/blob/master/README.md#arrow-body-style-and-prefer-arrow-callback-issue
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/no-explicit-any': 'off' // 临时关闭typescript中对any的限制
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // prettier插件（即eslint-plugin-prettier）将prettier规则转换为Eslint规则
  plugins: ['@typescript-eslint', 'prettier']
};
