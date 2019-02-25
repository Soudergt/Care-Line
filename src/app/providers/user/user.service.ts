import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Caretaker } from 'src/app/classes/caretaker';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.api}/backend/user/getUsers`
    ); 
  }

  public getUser(uid: number): Observable<any> {
    return this.http.get(
      `${environment.api}/backend/user/getUser/?uid=${uid}`
    ).pipe(map((body: {data: {user: any}}) => {
      return body;
    })); 
  }

  public getCaretaker(id: number): Observable<any> {
    return this.http.get(
      `${environment.api}/backend/user/getCaretaker/?id=${id}`
    ).pipe(map((body: {data: {caretaker: any}}) => {
      return body.data.caretaker;
    }));
  }

  public addUser(user: User): Observable<User> {    
    return this.http.post<User>(`${environment.api}/backend/user/addUser/`, user);
  }

  public editUser(user: User) {
    return this.http.put(`${environment.api}/backend/user/editUser/`, user);
  }

  public deleteUser(uid: number) {
    return this.http.delete(`${environment.api}/backend/user/deleteUser/${uid}`);
  }
}
