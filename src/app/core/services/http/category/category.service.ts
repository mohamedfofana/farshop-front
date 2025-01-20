import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../../../model/db/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient = inject(HttpClient);
  private productUrl = environment.API_WHITE_LIST_ENDPOINT + '/category';

  findAll(): Observable<Category[]> {
    const endpoint = this.productUrl.concat('/findAll');

    return this.httpClient.get<Category[]>(endpoint);
  }
}
