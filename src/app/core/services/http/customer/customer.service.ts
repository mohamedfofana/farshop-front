import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Customer } from '../../../model/db/customer';
import { CustomerUpdateDto } from '../../../model/dto/customer/customerUpdateDto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  httpClient = inject(HttpClient);
  customerUrl = environment.API_SECURED_ENDPOINT + '/customer';

  findByEmail(email: string): Observable<Customer> {
    return this.httpClient.get<Customer>(
      this.customerUrl + '/findByEmail/' + email
    );
  }

  create(email: string): Observable<Customer> {
    return this.httpClient.post<Customer>(this.customerUrl + '/create', {
      email: email,
    });
  }

  update(customerUpdateDto: CustomerUpdateDto): Observable<Customer> {
    return this.httpClient.post<Customer>(
      this.customerUrl + '/update',
      customerUpdateDto
    );
  }
}
