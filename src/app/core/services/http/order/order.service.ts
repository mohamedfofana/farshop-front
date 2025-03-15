import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SaveOrderDto } from '@app/core/model/dto/order/saveOrderDto';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private securedPaymentUrl = environment.API_SECURED_ENDPOINT + '/order';

  save(saveOrderDto: SaveOrderDto) {
    const endpoint = this.securedPaymentUrl.concat('/save');

    return this.httpClient.post(endpoint, saveOrderDto);
  }
}
