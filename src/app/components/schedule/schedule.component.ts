import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { EventService } from 'src/app/providers/event/event.service';
import { Event } from 'src/app/classes/event';
import { User } from 'src/app/classes/user';
import Swal from 'sweetalert2';
import * as moment from 'moment';

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
    this.activeDay = moment().hour(0).minute(0).second(0).millisecond(0).toDate();
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
    if (changes.patient && changes.patient.currentValue) {
      this.getEventsForWeek(JSON.stringify(changes.patient.currentValue.UserID), this.firstDay.toISOString());
    }
  }

  nextWeek() {
    this.newWeek = this.week.map(day => {
      return moment(day).hour(0).minute(0).second(0).millisecond(0).add(1, 'w').toDate()      
    });
    this.week = this.newWeek;
    if (moment(this.activeDay).isBetween(this.week[0], this.week[6])) {
      this.activeDayNum = this.activeDay.getDay();
    } else {
      this.activeDayNum = 9;
    }
    this.getEventsForWeek(JSON.stringify(this.patient.UserID), moment(this.week[0]).toISOString());
  }

  prevWeek() {
    this.newWeek = this.week.map(day => {
      return moment(day).hour(0).minute(0).second(0).millisecond(0).subtract(1, 'w').toDate()      
    });
    this.week = this.newWeek;
    if (moment(this.activeDay).isBetween(moment(this.week[0]), moment(this.week[6]))) {
      this.activeDayNum = this.activeDay.getDay();
    } else {
      this.activeDayNum = 9;
    }
    this.getEventsForWeek(JSON.stringify(this.patient.UserID), moment(this.week[0]).toISOString());
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
    this.weekEvents = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: []
    };
    this.eventService.getEventsByWeek(uid, firstDay).subscribe(events => {
      this.events = events;
      this.events.forEach(event => {
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
          if (moment(newEvent.EventDate).isBetween(moment(this.week[0]), moment(this.week[6]))) {
            if (moment(newEvent.EventDate).day() === 0) {
              this.weekEvents.sunday.push(newEvent);
            } else if (moment(newEvent.EventDate).day() === 1) {
              this.weekEvents.monday.push(newEvent);
            } else if (moment(newEvent.EventDate).day() === 2) {
              this.weekEvents.tuesday.push(newEvent);
            } else if (moment(newEvent.EventDate).day() === 3) {
              this.weekEvents.wednesday.push(newEvent);
            } else if (moment(newEvent.EventDate).day() === 4) {
              this.weekEvents.thursday.push(newEvent);
            } else if (moment(newEvent.EventDate).day() === 5) {
              this.weekEvents.friday.push(newEvent);
            } else if (moment(newEvent.EventDate).day() === 6) {
              this.weekEvents.saturday.push(newEvent);
            }
          }
        });
      }
    });
  };

  editEvent(event: Event, list: Event[], index: number) {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '600px',
      data: { event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.editEvent(result).subscribe(updatedEvent => {
          list[index] = updatedEvent;
        });
      }
    });
  };

  deleteEvent(event: Event, list: Event[], index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be deleted!',
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eventService.deleteEvent(event).subscribe(removedEvent => {
          list.splice(index, 1);
          Swal.fire('Deleted!', 'The event has been deleted!', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The event was not deleted!', 'error')
      }
    })
  };

}
