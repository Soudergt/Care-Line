import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // getUser(uid: string): Observable<any> {
  //   return this.http.get(
  //     `${environment.api}/user/getUser/${uid}`,
  //     { withCredentials: true }
  //   ).pipe(map((body: { data: { user: any } }) => {
  //     return body.data.user;
  //   }));
  // }
}
