import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { AppUserDto } from '../../model/appuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  router  =  inject(Router);
  //baseUrl = 'http://localhost:3000/api';

  constructor() { 
  }
 
  register(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/user/regist`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/user/login`, data)
      .pipe(tap((result) => {
        if (result !== null) {
          localStorage.setItem('authUser', JSON.stringify(result));
        }
      }));
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

}
