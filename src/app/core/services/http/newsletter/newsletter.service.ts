import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private httpClient = inject(HttpClient);
  private productUrl = environment.API_WHITE_LIST_ENDPOINT + '/newsletter';

  subscribe(email: string) {
    const endpoint = this.productUrl.concat('/subscribe');

    return this.httpClient.post(endpoint, { email: email });
  }

  unsubscribe(email: string) {
    const endpoint = this.productUrl.concat('/unsubscribe');

    return this.httpClient.post(endpoint, { email: email });
  }
}
