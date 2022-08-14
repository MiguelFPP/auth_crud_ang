import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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


  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(
      `${this.api}/login`,
      { email, password },
      { headers }
    );
  }

  register(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(`${this.api}/register`, user, { headers });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.api}/logout`, {}, { headers: this.headers });
  }
}
