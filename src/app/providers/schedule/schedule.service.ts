import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { ScheduleEvent } from 'src/app/classes/scheduleEvent';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  public getWeekSchedule() {

  }

  public getEvents(selectedDate: Date): Observable<ScheduleEvent> {
    return this.http.get<ScheduleEvent>(
      `${environment.api}/backend/schedule/getEvents/?selectedDate=${selectedDate}`
    ); 
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
