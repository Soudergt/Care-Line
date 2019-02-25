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

  getWeekSchedule() {

  }

  getEvents(selectedDate: Date): Observable<any> {
    return this.http.get(
      `${environment.api}/backend/schedule/getEvents/?selectedDate=${selectedDate}`
    ); 
  }

  addEvent(scheduleEvent: ScheduleEvent) {
    return this.http.post<ScheduleEvent>(`${environment.api}/backend/schedule/addEvent/`, scheduleEvent);
  }

  editEvent(scheduleEvent: ScheduleEvent) {
    return this.http.post<ScheduleEvent>(`${environment.api}/backend/schedule/editEvent/`, scheduleEvent);
  }

  deleteEvent(eventID: number) {
    return this.http.post(`${environment.api}/backend/schedule/deleteEvent/`, eventID);
  }
}
