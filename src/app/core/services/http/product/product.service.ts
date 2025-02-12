import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../../model/db/product';
import { Observable } from 'rxjs';
import { CountAvailableDto } from '../../../model/dto/product/countAvailableDto';
import { FindByPageDto } from '../../../model/dto/product/findByPageDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private productUrl = environment.API_WHITE_LIST_ENDPOINT + '/product';

  search(findByPage: FindByPageDto): Observable<Product[]> {
    const endpoint = this.productUrl.concat('/search');

    return this.httpClient.post<Product[]>(endpoint, findByPage);
  }

  find(id: number): Observable<Product> {
    const endpoint = this.productUrl.concat('/findById');

    return this.httpClient.post<Product>(endpoint, { id: id });
  }

  findAllByPage(findByPage: FindByPageDto): Observable<Product[]> {
    const endpoint = this.productUrl.concat('/findAllByPage');

    return this.httpClient.post<Product[]>(endpoint, findByPage);
  }

  countAvailable(countAvailable: CountAvailableDto): Observable<number> {
    const endpoint = this.productUrl.concat('/countAvailable');

    return this.httpClient.post<number>(endpoint, countAvailable);
  }
}
