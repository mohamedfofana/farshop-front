import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SocialMediaComponent } from '../../components/product/social-media/social-media.component';
import { NewsletterComponent } from '../../components/common/newsletter/newsletter.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    SocialMediaComponent,
    NewsletterComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
