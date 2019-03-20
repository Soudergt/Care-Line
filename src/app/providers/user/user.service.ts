import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.api}/api/user/getUsers`
    ); 
  }

  public getUser(uid: number): Observable<User> {
    return this.http.get(
      `${environment.api}/api/user/getUser/?uid=${uid}`
    ).pipe(map((body: {data: {user: User}}) => {
      return body.data.user;
    })); 
  }

  public getPatients(): Observable<any> {
    return this.http.get(
      `${environment.api}/api/user/getPatients`
    ).pipe(map((body: {data: {patients: User[]}}) => {
      return body.data.patients;
    })); 
  }

  public getCaretakers(): Observable<any> {
    return this.http.get(
      `${environment.api}/api/user/getCaretakers`
    ).pipe(map((body: {data: {caretakers: User[]}}) => {
      return body.data.caretakers;
    })); 
  }

  public addUser(user: User): Observable<any> {    
    return this.http.post(
      `${environment.api}/api/user/add`, { user }
    ).pipe(map((body: {data: {user: User}}) => {
      return body.data.user;
    })); 
  }

  public editUser(user: User): Observable<any> {
    return this.http.put(
      `${environment.api}/api/user/edit`, { user }
    ).pipe(map((body: {data: {user: User}}) => {
      return body.data.user;
    })); 
  }

  public deleteUser(user: User): Observable<any> {
    return this.http.post(
      `${environment.api}/api/user/delete`, { user }
    ).pipe(map((body: {data: {user: User}}) => {
      return body.data.user;
    }));
  }
}
