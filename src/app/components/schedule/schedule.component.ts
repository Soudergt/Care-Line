import { Component, OnInit, Input } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { ScheduleEvent } from 'src/app/classes/scheduleEvent';
import { EventService } from 'src/app/providers/event/event.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input('activeDay') activeDay: Date;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  moment = moment;
  today: Date;
  firstDay: Date;
  lastDay: Date;
  activeDayNum: number;
  week: Date[];
  newWeek: Date[];
  events: ScheduleEvent[];

  constructor(
    public dialog: MatDialog,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.activeDayNum = this.activeDay.getDay();
    this.firstDay = moment().startOf('week').toDate();
    this.week = [];
    this.week.push(this.firstDay);
    for (let index = 1; index < 7; index++) {
      this.week.push(moment(this.firstDay).add(index, 'd').toDate());
    }    
  }

  nextWeek() {
    this.newWeek = this.week.map(day => {
      return moment(day).add(1, 'w').toDate()      
    });
    this.week = this.newWeek;
  }

  prevWeek() {
    this.newWeek = this.week.map(day => {
      return moment(day).subtract(1, 'w').toDate()      
    });
    this.week = this.newWeek;
  }
  
  getDay(day: any): void {
    this.activeDay = day;
    this.activeDayNum = this.activeDay.getDay();
  }

  getEventsForWeek(firstDay: Date):void {

  }

  addEvent() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.addEvent(result).subscribe(newEvent => this.events.push(newEvent));
      }
    });
  };

  editEvent(selectedEvent: ScheduleEvent, index: number) {
    this.eventService.editEvent(selectedEvent)
      .subscribe(updatedEvent => this.events[index] = {
        name: updatedEvent['name'],
        desc: updatedEvent['desc'],
        date: updatedEvent['date'],
        time: updatedEvent['time']
      });
  };

  deleteEvent(eventID: number, index: number) {
    this.eventService.deleteEvent(eventID).subscribe();
  };

}
