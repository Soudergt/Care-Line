import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ScheduleEvent } from 'src/app/classes/scheduleEvent';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getWeekSchedule() {

  }

  getToday() {
    
  }

  getAppointments() {

  }

  addEvent(scheduleEvent: ScheduleEvent) {
    return this.http.post<ScheduleEvent>(`${environment.api}/backend/schedule/addEvent/`, scheduleEvent)
  }
}
