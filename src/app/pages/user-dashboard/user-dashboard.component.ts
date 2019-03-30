import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../providers/user/user.service';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { faBell, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './../../classes/user';

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
  userPhoto;
  dataSource: any[];

  chartOptions = {
    responsive: false,
    legend: {
      display: true,
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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    try {
      this.activeData = this.ageData;
      this.activeNoti = 'notifications';
      this.drawChart();
      this.getUser(2);      
    } catch (err) {
      console.log(err);
    }
  }

  getUser(uid: number): void {
    this.userService.getUser(uid).subscribe(user => {
      this.user = user;
      this.userPhoto = `url(/assets/images/people/${this.user.UserType}/${this.user.NameFirst.toLowerCase()}${this.user.NameLast.toLowerCase()}.jpg)`;
    });
  }

  getPatients(patientList: any[]): void {
    this.dataSource = [...patientList];
  }

  changeChart(type: string): void {
    if (type === 'age') {
      this.activeData = this.ageData;
      this.drawChart();
    } else if (type === 'gender') {
      this.activeData = this.genderData;
      this.drawChart();
    }
  }

  drawChart(): void {
    this.ctx = document.getElementById('patientsChart');
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: this.activeData,
      options: this.chartOptions
    });
  }

}
