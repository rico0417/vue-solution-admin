import { createI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils/languageUtils';
import type { App } from 'vue';
import zh from './modules/zh';
import en from './modules/en';

export function setupI18n(app: App<Element>) {
  const i18n = createI18n({
    // Use Composition API, Set to false
    allowComposition: true,
    legacy: false,
    locale: getBrowserLang(),
    messages: {
      zh,
      en
    }
  });
  app.use(i18n);
}
