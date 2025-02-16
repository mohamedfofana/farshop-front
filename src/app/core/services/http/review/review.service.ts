import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../../../model/db/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private httpClient = inject(HttpClient);
  private reviewUrl = environment.API_WHITE_LIST_ENDPOINT + '/review';

  findAllByProduct(idProduct: number): Observable<Review[]> {
    const endpoint = this.reviewUrl.concat('/findAllByProduct');

    return this.httpClient.post<Review[]>(endpoint, { id: idProduct });
  }
}
