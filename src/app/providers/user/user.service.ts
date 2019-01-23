import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(uid: string): Observable<any> {
    return this.http.get<User>(
      `${environment.api}/backend/user/getUser/?uid=${uid}`
    ); 
  }

  addUser(user: User) {
    console.log(user);
    
    return this.http.post<User>(`${environment.api}/backend/user/addUser/`, user)
    .pipe(); 
  }
}
