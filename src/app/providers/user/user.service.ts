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
      `/api/user/getUsers`
    ); 
  }

  public getUser(uid: number): Observable<User> {
    return this.http.get(
      `/api/user/getUser/?uid=${uid}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {user: User}}) => {
      return body.data.user;
    })); 
  }

  public getPatients(): Observable<any> {
    return this.http.get(
      `/api/user/getPatients`,
      { withCredentials: true }
    ).pipe(map((body: {data: {patients: User[]}}) => {
      return body.data.patients;
    })); 
  }

  public getCaretakers(): Observable<any> {
    return this.http.get(
      `/api/user/getCaretakers`,
      { withCredentials: true }
    ).pipe(map((body: {data: {caretakers: User[]}}) => {
      return body.data.caretakers;
    })); 
  }

  public addUser(user: User): Observable<any> {    
    return this.http.post(
      `/api/user/add`, { user },
      { withCredentials: true }
    ).pipe(map((body: {data: {newUser: User}}) => {
      return body.data.newUser;
    })); 
  }

  public editUser(user: User): Observable<any> {
    return this.http.put(
      `/api/user/edit`, { user },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedUser: User}}) => {
      return body.data.updatedUser;
    })); 
  }

  public deleteUser(user: User): Observable<any> {
    return this.http.post(
      `/api/user/delete`, { user },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedUser: User}}) => {
      return body.data.removedUser;
    }));
  }
}
