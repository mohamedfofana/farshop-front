import { Component, computed, inject, signal } from '@angular/core';
import { TranslationService } from '../../core/services/translationService/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './no-data-found.component.html',
})
export class NoDataFoundComponent {

}
