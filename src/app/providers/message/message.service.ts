import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(id: number, message: any): Observable<any> {
    return this.http.post(`${environment.api}/message/send`, {id, message});
  }

  getMessages(id: number): Observable <any> {
    return this.http.get(
      `${environment.api}/message/getMessages/?id=${id}`
    ).pipe(map((body: {data: {messages: any}}) => {
      return body.data.messages;
    })); 
  }
}
