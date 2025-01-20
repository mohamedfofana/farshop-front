import { Component, inject } from '@angular/core';
import { NewsletterService } from '../../../../core/services/http/newsletter/newsletter.service';
import { AbstractOnDestroy } from '../../../../core/directives/unsubscriber/abstract.ondestroy';
import { UtilsService } from '../../../../core/services/utils/utils/utils.service';
import { NotifierService } from '../../../../core/services/utils/notifier/notifier.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent extends AbstractOnDestroy {
  newsletterService = inject(NewsletterService);
  notifierService = inject(NotifierService);
  utilsService = inject(UtilsService);
  email: string = '';

  subscribe() {
    if (this.utilsService.isEmail(this.email)) {
      this.subscriptions.push(
        this.newsletterService
          .subscribe(this.email)
          .subscribe(() => this.notifierService.success('Subscribed'))
      );
    }
  }
}
