import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  public login(username: String, password: String): Observable<any> {
    return this.http.post(
      `${environment.api}/auth/login`, {username, password}
    ).pipe(map((body: {data: {user: any}}) => {
      if (body.data.user) {
        body.data.user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(body.data.user));
      }
      return body.data.user;
    })); 
  }

  public logout() {
    localStorage.removeItem('currentUser');
    return this.http.post(`${environment.api}/backend/auth/logout`, {});
  } 
}
