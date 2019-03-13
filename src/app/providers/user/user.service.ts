import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { Caretaker } from 'src/app/classes/caretaker';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.api}/backend/user/getUsers`
    ); 
  }

  public getUser(uid: number): Observable<User> {
    return this.http.get(
      `${environment.api}/user/getUser/?uid=${uid}`
    ).pipe(map((body: {data: {user: User}}) => {
      return body.data.user;
    })); 
  }

  public getPatients(): Observable<any> {
    return this.http.get(
      `${environment.api}/user/getPatients`
    ).pipe(map((body: {data: {patients: User[]}}) => {
      return body.data.patients;
    })); 
  }

  public getCaretakers(): Observable<any> {
    return this.http.get(
      `${environment.api}/user/getCaretakers`
    ).pipe(map((body: {data: {caretakers: User[]}}) => {
      return body.data.caretakers;
    })); 
  }

  public addUser(user: User): Observable<User> {    
    return this.http.post<User>(`${environment.api}/user/add`, user);
  }

  public editUser(user: User) {
    return this.http.put(`${environment.api}/user/edit`, user);
  }

  public deleteUser(uid: number) {
    return this.http.delete(`${environment.api}/user/delete/${uid}`);
  }
}
