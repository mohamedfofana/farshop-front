import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { CodeSnippetComponent } from '../../../shared/components/code-snippet.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  title = 'Decoded ID Token';

  private auth = inject(AuthService);

  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));
}
