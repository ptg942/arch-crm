import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  supportedLangs = ['en', 'ru', 'uz'];
  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(this.supportedLangs);
    const browserLang = this.translate.getBrowserLang();
    const lang = browserLang?.match(/en|ru|uz/) ? browserLang : 'en';
    this.setLang(lang);
  }

  setLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  getLang() {
    return this.currentLang;
  }
}
