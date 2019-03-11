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
    ).pipe(map((body) => {
      return body;
    })); 
  }

  public logout() {
    return this.http.post(`${environment.api}/backend/auth/logout`, {});
  } 
}
