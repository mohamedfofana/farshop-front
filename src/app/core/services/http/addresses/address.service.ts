import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Address } from '../../../model/db/address';
import { FindByTypeDto } from '../../../model/dto/address/findByTypeDto';
import { AddressDto } from '../../../model/dto/address/addressDto';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private httpClient = inject(HttpClient);
  private addressUrl = environment.API_PUBLIC_ENDPOINT + '/address';

  findAll(): Observable<Address[]> {
    const endpoint =
      environment.API_SECURED_ENDPOINT + '/address'.concat('/findAll');

    return this.httpClient.get<Address[]>(endpoint);
  }

  findByCustomerAndType(findByTypeDto: FindByTypeDto): Observable<Address[]> {
    const endpoint = this.addressUrl.concat('/findByCustomerIdAndType');

    return this.httpClient.post<Address[]>(endpoint, findByTypeDto);
  }

  save(addressDto: AddressDto): Observable<Address[]> {
    const endpoint = this.addressUrl.concat('/save');

    return this.httpClient.post<Address[]>(endpoint, addressDto);
  }

  update(addressDto: AddressDto): Observable<Address[]> {
    const endpoint = this.addressUrl.concat('/update');

    return this.httpClient.post<Address[]>(endpoint, addressDto);
  }

  delete(id: number): Observable<Object> {
    const endpoint = this.addressUrl.concat('/delete/').concat(id.toString());

    return this.httpClient.delete(endpoint);
  }
}
