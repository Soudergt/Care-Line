import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  public login(username: String, password: String): Observable<any> {
    return this.http.post(
      `/api/auth/login`, {username, password},
      { withCredentials: true }
    ).pipe(map((body: {data: {user: any}}) => {
      this.isLoggedIn.emit(true);
      return body.data.user;
    })); 
  }

  public hasValidSession(): Observable<boolean> {
    return this.http.get(
      `/api/session/valid`,
      { withCredentials: true }
    ).pipe(map((body: { valid: boolean }) => {
      this.isLoggedIn.emit(true);
      return body.valid || false;
    }));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn.emit(false);
    return this.http.post(`/api/auth/logout`, {});
  }
}
