import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PaymentDto } from '@app/core/model/dto/payment/paymentDto';
import { PaymentCreateIntentDto as CreatePaymentIntentDto } from '@app/core/model/dto/payment/paymentCreateIntentDto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private httpClient = inject(HttpClient);
  private securedPaymentUrl = environment.API_SECURED_ENDPOINT + '/payment';

  createPaymentIntent(
    paymentDto: PaymentDto
  ): Observable<CreatePaymentIntentDto> {
    const endpoint = this.securedPaymentUrl.concat('/createPaymentIntent');

    return this.httpClient.post<CreatePaymentIntentDto>(endpoint, paymentDto);
  }
}
