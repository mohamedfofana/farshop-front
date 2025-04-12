import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FindOrderDto } from '@app/core/model/dto/order/in/findOrderDto';
import { SaveOrderDto } from '@app/core/model/dto/order/out/saveOrderDto';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  private securedPaymentUrl = environment.API_SECURED_ENDPOINT + '/order';

  findById(id: number): Observable<FindOrderDto> {
    const endpoint = this.securedPaymentUrl
      .concat('/findById')
      .concat('/' + id);

    return this.httpClient.get<FindOrderDto>(endpoint);
  }

  findAll(): Observable<FindOrderDto[]> {
    const endpoint = this.securedPaymentUrl.concat('/findAll');

    return this.httpClient.get<FindOrderDto[]>(endpoint);
  }

  save(saveOrderDto: SaveOrderDto) {
    const endpoint = this.securedPaymentUrl.concat('/save');

    return this.httpClient.post(endpoint, saveOrderDto);
  }

  return(id: number) {
    const endpoint = this.securedPaymentUrl.concat('/return');

    return this.httpClient.post(endpoint, { id: id });
  }

  cancel(id: number) {
    const endpoint = this.securedPaymentUrl.concat('/cancel');

    return this.httpClient.post(endpoint, { id: id });
  }
}
