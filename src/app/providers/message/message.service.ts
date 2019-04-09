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

  public sendMessage(message: any): Observable<any> {
    return this.http.post(
      `/api/message/send`, { message },
      { withCredentials: true }
    ).pipe(map((body: {data: {newMessage: any}}) => {
      return body.data.newMessage;
    })); 
  }

  public getMessages(id: number): Observable <any> {
    return this.http.get(
      `/api/message/getMessages?id=${id}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {messages: any}}) => {
      return body.data.messages;
    })); 
  }
}
