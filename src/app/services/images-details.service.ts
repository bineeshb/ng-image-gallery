import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GalleryResponse } from '../interfaces/gallery';


@Injectable({
  providedIn: 'root'
})
export class ImagesDetailsService {
  private readonly accessKey = null;
  private readonly defaultPageNumber = 1;
  private readonly defaultPageSize = 30;

  constructor(private readonly httpClient: HttpClient) { }

  getImages(pageNumber = this.defaultPageNumber, pageSize = this.defaultPageSize): Observable<GalleryResponse> {
    return this.httpClient.get(
        `https://api.unsplash.com/photos/?page=${pageNumber}&per_page=${pageSize}&client_id=${this.accessKey}`,
        { observe: 'response' }
      )
      .pipe(
        map((response: HttpResponse<any>) => ({
          data: response.body,
          pageNumber,
          pageSize: Number(response.headers.get('X-Per-Page')),
          total: Number(response.headers.get('X-Total'))
        }))
      );
  }
}
