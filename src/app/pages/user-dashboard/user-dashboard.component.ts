import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../providers/user/user.service';
import { StatusService } from 'src/app/providers/status/status.service';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { faBell, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './../../classes/user';
import * as moment from "moment";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  chart = {};
  data = {};
  ctx: any;
  displayedColumns: string[] = ['desc', 'date', 'time', 'patient'];
  faCalendarCheck = faCalendarCheck;
  faUsers = faUsers;
  faBell = faBell;
  faChartBar = faChartBar;
  activeNoti: string;
  user: User;
  newURL: string;
  userPhoto: string;
  dataSource: any[];
  uidsArray: any[];
  upcommingPatients: any[];

  chartOptions = {
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: '#000',
        fontSize: 16
      },
      title: {
        display: true,
        text: "Patient Age"
      }
    }
  }
  chartData = [2, 3, 1];
  chartLabels = [
    '60-65',
    '65-70',
    '70-75'
  ];
  chartType = 'doughnut';
  chartColors = [{
    backgroundColor: ['rgba(239,83,80 ,1)', 'rgba(236,64,122 ,1)', 'rgba(171,71,188 ,1)', 'rgba(126,87,194 ,1)', 'rgba(92,107,192 ,1)', 'rgba(66,165,245 ,1)', 'rgba(41,182,246 ,1)', 'rgba(38,198,218 ,1)', 'rgba(38,166,154 ,1)', 'rgba(102,187,106 ,1)']
  }];

  ageData = {
    datasets: [{
      data: [2, 3, 1],
      backgroundColor: ['#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#FDD835', '#FFB300', '#757575', '#546E7A']
    }],
    labels: [
      '60-65',
      '65-70',
      '70-75'
    ]
  };
  genderData = {
    datasets: [{
      data: [2, 4],
      backgroundColor: ['#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#FDD835', '#FFB300', '#757575', '#546E7A']
    }],
    labels: [
      'Female',
      'Male'
    ]
  };
  activeData = {};
  current: 3;
  max: 8;

  constructor(
    private userService: UserService,
    private statusService: StatusService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    try {
      this.uidsArray = [];
      this.activeData = this.ageData;
      this.activeNoti = 'users';
      this.upcommingPatients = [];
      this.getUser(1);
    } catch (err) {
      console.log(err);
    }
  }

  getUser(uid: number): void {
    this.userService.getUser(uid).subscribe(user => {
      this.user = user;      
      this.userPhoto = `url(/assets/images/people/${this.user.UserType.toLowerCase()}/${this.user.NameFirst.toLowerCase()}${this.user.NameLast.toLowerCase()}.png)`;
    });
  }

  getStatusCounts(uids: string): void {
    let newData = [];
    let newLabels = [];
    this.userService.getStatusCounts(uids).subscribe(counts => {
      counts.forEach((count:any) => {
        newData.push(count.user.statusList.length);
        newLabels.push(count.user.NameFirst + ' ' + count.user.NameLast);

        if (count.user.statusList.length === 0) {
          this.upcommingPatients.push(count.user);
        } else if (count.user.statusList.length > 0) {
          this.upcommingPatients.push(count.user);
          count.user.statusList.forEach((status: any) => {
            if (moment(status.Date).isSame(moment(), 'day')) {
              this.upcommingPatients.splice(this.upcommingPatients.length - 1, 1);
            }
          });
        }
      });
      this.chartLabels = newLabels;
      this.chartData = newData;
    });
  }

  getPatients(patientList: any[]): void {
    patientList.forEach(patient => {
      this.uidsArray.push(patient.UserID);
    });
    let uids = this.uidsArray.join();
    this.getStatusCounts(uids);
  }

  getEvents(eventList: any[]): void {
    this.dataSource = [...eventList];
  }

  changeChart(type: string): void {
    if (type === 'age') {
      this.activeData = this.ageData;
    } else if (type === 'gender') {
      this.activeData = this.genderData;
    }
  }

}
