import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ContactDto } from '../../../model/dto/contact/contactDto';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly httpClient = inject(HttpClient);
  private readonly productUrl =
    environment.API_WHITE_LIST_ENDPOINT + '/contact';

  send(contact: ContactDto) {
    const endpoint = this.productUrl;

    return this.httpClient.post(endpoint, contact);
  }
}
