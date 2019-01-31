import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/classes/user';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(
      `${environment.api}/backend/user/getUsers`
    ); 
  }

  getUser(uid: string): Observable<any> {
    // console.log(this.http.get(
    //   `${environment.api}/backend/user/getUser/?uid=${uid}`
    // ).pipe(
    //   tap(_ => this.log(`fetched user id=${uid}`))
    // ));

    
    return this.http.get(
      `${environment.api}/backend/user/getUser/?uid=${uid}`
    ); 
  }

  addUser(user: User) {
    console.log(user);
    
    return this.http.post<User>(`${environment.api}/backend/user/addUser/`, user)
    .pipe(); 
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
