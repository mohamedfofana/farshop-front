import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { RouterOutlet } from '@angular/router';
import { HeaderTopComponent } from '../header-top/header-top.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderTopComponent,
    FooterComponent,
    CarrouselComponent,
    RouterOutlet,
  ],
  templateUrl: './base-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent {}
