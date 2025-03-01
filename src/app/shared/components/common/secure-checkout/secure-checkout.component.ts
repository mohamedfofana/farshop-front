import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-secure-checkout',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="d-flex justify-content-center gap-2 mt-2">
      <i class="bi bi-shield-check text-success"></i>
      <small class="text-muted">{{
        'general.label.secure-checkout' | translate
      }}</small>
    </div>
  `,
  styles: ``,
})
export class SecureCheckoutComponent {}
