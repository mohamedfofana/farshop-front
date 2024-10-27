import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule, UpperCasePipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isLoggedIn = signal(false);
  openSeacrh = signal(false);

  logout() {
    // TODO
  }
}
