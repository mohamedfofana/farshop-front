import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CodeLanguage } from './core/model/enum/CodeLanguage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private  translateService = inject(TranslateService)
  title = 'farshop-front';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let defaultLang = this.translateService.currentLang;
    if (isPlatformBrowser(this.platformId)) {
      const storedLang = localStorage.getItem('lng');
      const codeLanguekeys = Object.keys(CodeLanguage);
      const currentCodeLangue = Object.values(CodeLanguage).find(
        (s) => s === storedLang
      );
      if (currentCodeLangue) {
        defaultLang = currentCodeLangue;
      }
      this.translateService.setDefaultLang(defaultLang);
      this.translateService.use(defaultLang);
    }
  }
}
