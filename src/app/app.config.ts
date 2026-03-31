import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withPrismHighlighter } from '@analogjs/content/prism-highlighter';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';

import pt from '../assets/i18n/pt.json';
import en from '../assets/i18n/en.json';

const TRANSLATIONS: Record<string, Record<string, unknown>> = { pt, en };

registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localeEn, 'en-US');

class InlineTranslateLoader implements TranslateLoader {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang] ?? TRANSLATIONS['pt']);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideFileRouter(),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'pt',
        loader: {
          provide: TranslateLoader,
          useClass: InlineTranslateLoader,
        },
      })
    ),
  ],
};
