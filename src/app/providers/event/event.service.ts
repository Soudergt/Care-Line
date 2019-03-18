import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public getEvents(uid: string, date: string): Observable<any> {
    return this.http.get(
      `${environment.api}/event/getEvents`, {params: new HttpParams().set('uid', uid).set('date', date)}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEventsByWeek(uid: string, startDate: string): Observable<any> {
    return this.http.get(
      `${environment.api}/event/getEventsByWeek`, {params: new HttpParams().set('uid', uid).set('startDate', startDate)}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEvent(id: number): Observable<any> {
    return this.http.get(
      `${environment.api}/event/getEvent/?id=${id}`
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public addEvent(event: any): Observable<any> {    
    return this.http.post(`${environment.api}/event/add`, event);
  }

  public editEvent(event: any): Observable<any> {    
    return this.http.put(`${environment.api}/event/edit`, event);
  }

  public deleteEvent(id: number): Observable<any> {    
    return this.http.delete(`${environment.api}/event/delete/${id}`);
  }
}
