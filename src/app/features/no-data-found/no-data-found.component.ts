import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './no-data-found.component.html',
})
export class NoDataFoundComponent {}
