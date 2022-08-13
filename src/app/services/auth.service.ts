import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  api: string = environment.apiUrl;

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(
      `${this.api}/login`,
      { email, password },
      { headers }
    );
  }
}
