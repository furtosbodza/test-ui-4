import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  //baseUrl = 'http://localhost:3000/api';

  constructor() { }

  register(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/user/regist`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/user/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

}
