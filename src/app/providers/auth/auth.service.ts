import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    console.log(localStorage.getItem('currentUser'));
    
    return this.loggedIn.asObservable();
  }

  public login(username: String, password: String): Observable<any> {
    return this.http.post(
      `${environment.api}/auth/login`, {username, password}
    ).pipe(map((body: {data: {user: any}}) => {
      if (body.data.user) {
        this.user.next(body.data.user);
        this.loggedIn.next(true);
        localStorage.setItem('currentUser', JSON.stringify(body.data.user));
      }
      return body.data.user;
    })); 
  }

  public verifyLogin(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    localStorage.removeItem('currentUser');
    return this.http.post(`${environment.api}/auth/logout`, {});
  }
}
