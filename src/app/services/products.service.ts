import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  api: string = environment.apiUrl;
  headers!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.api}/products`, { headers: this.headers });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.api}/products/${id}`, {
      headers: this.headers,
    });
  }
}
