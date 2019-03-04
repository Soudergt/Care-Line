import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ScheduleEvent } from 'src/app/classes/scheduleEvent';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  public getWeekSchedule(start: Date): Observable<any> {
    return this.http.get(
      `${environment.api}/schedule/getWeek/?start=${start}`
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public getEvents(selectedDate: Date): Observable<any> {
    return this.http.get(
      `${environment.api}/schedule/getEvents/?selectedDate=${selectedDate}`
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public addEvent(scheduleEvent: ScheduleEvent) {
    return this.http.post<ScheduleEvent>(`${environment.api}/backend/schedule/addEvent`, scheduleEvent);
  }

  public editEvent(scheduleEvent: ScheduleEvent) {
    return this.http.put(`${environment.api}/backend/schedule/editEvent`, scheduleEvent);
  }

  public deleteEvent(eventID: number) {
    return this.http.delete(`${environment.api}/backend/schedule/deleteEvent/${eventID}`);
  }
}
