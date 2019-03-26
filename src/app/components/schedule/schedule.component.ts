import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { EventService } from 'src/app/providers/event/event.service';
import { Event } from 'src/app/classes/event';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input('activeDay') activeDay: Date;
  @Input('patient') patient: User;
  @Output() newDay = new EventEmitter<Date>();
  //Icons
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  moment = moment;
  today: Date;
  firstDay: Date;
  lastDay: Date;
  activeDayNum: number;
  week: Date[];
  newWeek: Date[];
  events: Event[];

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
    this.newDay.emit(this.activeDay);
  }

  getEventsForWeek(firstDay: string):void {
    this.eventService.getEventsByWeek(this.patient, firstDay).subscribe(events => {
      this.events = events;
      console.log(this.events);
    });
  }

  addEvent() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // if (result) {
      //   this.eventService.addEvent(this.patient, result).subscribe(newEvent => {
      //     console.log(newEvent);
      //   });
      // }
    });
  };

  editEvent(event: Event, index: number) {
    
  };

  deleteEvent(event: Event, index: number) {
    this.eventService.deleteEvent(event).subscribe();
  };

}
