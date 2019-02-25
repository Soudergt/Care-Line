import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(
      `${environment.api}/backend/user/getUsers`
    ); 
  }

  getUser(uid: string): Observable<any> {
    return this.http.get(
      `${environment.api}/backend/user/getUser/?uid=${uid}`
    ); 
  }

  addUser(user: User) {    
    return this.http.post<User>(`${environment.api}/backend/user/addUser/`, user);
  }

  editUser(user: User) {
    return this.http.post<User>(`${environment.api}/backend/user/editUser/`, user);
  }

  deleteUser(uid: number) {
    return this.http.post<User>(`${environment.api}/backend/user/deleteUser/`, uid);    
  }
}
