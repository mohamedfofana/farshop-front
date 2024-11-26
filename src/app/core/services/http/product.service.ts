import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../../model/product';
import { Observable } from 'rxjs';
import { FindByPageDto } from '../../model/dto/findByPageDto';
import { CountAvailableDto } from '../../model/dto/countAvailableDto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private productUrl = environment.API_WHITE_LIST_ENDPOINT + '/product';

  getProductsByPage(findByPage: FindByPageDto): Observable<Product[]> {
    const endpoint = this.productUrl.concat('/findAllByPage');

    return this.httpClient.post<Product[]>(endpoint, findByPage);
  }

  countAvailable(countAvailable: CountAvailableDto): Observable<number> {
    const endpoint = this.productUrl.concat('/countAvailable');

    return this.httpClient.post<number>(endpoint, countAvailable);
  }
}
