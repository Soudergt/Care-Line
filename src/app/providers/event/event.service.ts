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
      `/api/event/getEvents`, {params: new HttpParams().set('uid', uid).set('date', date), withCredentials: true},
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEventsByWeek(uid: string, startDate: string): Observable<any> {
    return this.http.get(
      `/api/event/getEventsByWeek`, {params: new HttpParams().set('uid', uid).set('startDate', startDate), withCredentials: true}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEvent(id: number): Observable<any> {
    return this.http.get(
      `/api/event/getEvent/?id=${id}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public addEvent(event: any): Observable<any> {    
    return this.http.post(
      `/api/event/add`, { event },
      { withCredentials: true }
    ).pipe(map((body: {data: {newEvent: any}}) => {
      return body.data.newEvent;
    })); 
  }

  public editEvent(event: any): Observable<any> {    
    return this.http.put(
      `/api/event/edit`, { event },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedEvent: any}}) => {
      return body.data.updatedEvent;
    })); 
  }

  public deleteEvent(event: any): Observable<any> {
    return this.http.post(
      `/api/event/delete`, { event },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedEvent: any}}) => {
      return body.data.removedEvent;
    }));
  }
}
