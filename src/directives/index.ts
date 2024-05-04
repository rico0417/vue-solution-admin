import { App, Directive } from 'vue';

const directivesList: { [key: string]: Directive } = {};

export function setupDirectives(app: App<Element>) {
  const directives = {
    install: function (app: App<Element>) {
      Object.keys(directivesList).forEach((key) => {
        app.directive(key, directivesList[key]);
      });
    }
  };
  app.use(directives);
}
