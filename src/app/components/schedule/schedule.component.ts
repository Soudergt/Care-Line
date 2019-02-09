import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
 
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  moment = moment;
  today: Date;
  firstDay: Date;
  lastDay: Date;
  activeDay: number;
  week: Date[];
  newWeek: Date[];

  constructor() { }

  ngOnInit() {
    this.today = new Date();
    this.activeDay = this.today.getDay();
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

}
