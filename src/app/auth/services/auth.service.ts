import { User } from './../interfaces/interfaces';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/interfaces';
import { catchError, map, tap} from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!:  User;

  get user() {
    return {...this._user};
  }
  constructor(private http: HttpClient ) { }

  login( email:string, password: string) {

    const url = `${this.baseUrl}auth`;
    const body = {email, password};

    return  this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        console.log(resp, '<== respons from auth service')

        if (resp.ok) {

          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
          }
         }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    );

  }

  validateToken() {

    const url = `${this.baseUrl}auth/renew`;

    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');


    return this.http.get(url, {headers});

  }
}
