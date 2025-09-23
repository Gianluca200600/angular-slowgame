import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import './auto-iframe-height';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

createApplication({ providers: [] }).then(appRef => {
  const injector = appRef.injector;
  const element = createCustomElement(App, { injector });
  customElements.define('my-ng-app', element);
});
