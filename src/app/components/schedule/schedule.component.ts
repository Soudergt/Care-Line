import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class ScheduleComponent implements OnInit, OnChanges {
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
  weekEvents: any;

  constructor(
    public dialog: MatDialog,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.activeDayNum = this.activeDay.getDay();
    this.firstDay = moment().startOf('week').hour(0).minute(0).second(0).millisecond(0).toDate();
    this.week = [];
    this.week.push(this.firstDay);
    for (let index = 1; index < 7; index++) {
      this.week.push(moment(this.firstDay).add(index, 'd').toDate());
    }

    this.weekEvents = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: []
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.patient.currentValue) {
      this.getEventsForWeek(JSON.stringify(changes.patient.currentValue.UserID), this.firstDay.toISOString());
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

  getEvents(uid: string, day: string): void {
    this.eventService.getEvents(uid, day).subscribe(events => {
      this.events = events;
    });
  }

  getEventsForWeek(uid: string, firstDay: string):void {
    this.eventService.getEventsByWeek(uid, firstDay).subscribe(events => {
      this.events = events;
      this.events.forEach(event => {
        console.log(event);
        if (moment(event.EventDate).day() === 0) {
          this.weekEvents.sunday.push(event);
        } else if (moment(event.EventDate).day() === 1) {
          this.weekEvents.monday.push(event);
        } else if (moment(event.EventDate).day() === 2) {
          this.weekEvents.tuesday.push(event);
        } else if (moment(event.EventDate).day() === 3) {
          this.weekEvents.wednesday.push(event);
        } else if (moment(event.EventDate).day() === 4) {
          this.weekEvents.thursday.push(event);
        } else if (moment(event.EventDate).day() === 5) {
          this.weekEvents.friday.push(event);
        } else if (moment(event.EventDate).day() === 6) {
          this.weekEvents.saturday.push(event);
        }
      });

      console.log(this.weekEvents);

    });
  }

  addEvent() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px',
      data: { event: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.addEvent(this.patient, result).subscribe(newEvent => {
          console.log(newEvent);
        });
      }
    });
  };

  editEvent(event: Event, index: number) {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px',
      data: { event }
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

  deleteEvent(event: Event, index: number) {
    this.eventService.deleteEvent(event).subscribe();
  };

}
