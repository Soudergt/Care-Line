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
      `/api/event/getEvents`, {params: new HttpParams().set('uid', uid).set('date', date)}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEventsByWeek(uid: string, startDate: string): Observable<any> {
    return this.http.get(
      `/api/event/getEventsByWeek`, {params: new HttpParams().set('uid', uid).set('startDate', startDate)}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEvent(id: number): Observable<any> {
    return this.http.get(
      `/api/event/getEvent/?id=${id}`
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public addEvent(event: any): Observable<any> {    
    return this.http.post(
      `/api/event/add`, { event }
    ).pipe(map((body: {data: {event: any}}) => {
      return body.data.event;
    })); 
  }

  public editEvent(event: any): Observable<any> {    
    return this.http.put(
      `/api/event/edit`, { event }
    ).pipe(map((body: {data: {event: any}}) => {
      return body.data.event;
    })); 
  }

  public deleteUser(event: any): Observable<any> {
    return this.http.post(
      `/api/event/delete`, { event }
    ).pipe(map((body: {data: {event: any}}) => {
      return body.data.event;
    }));
  }
}
