import { User } from './../../classes/user';
import { UserService } from './../../providers/user/user.service';
import { Component, OnInit } from '@angular/core';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { faBell, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';
import { Caretaker } from 'src/app/classes/caretaker';
import { MessageService } from 'src/app/providers/message/message.service';

export interface AppointmentElement {
  desc: string;
  date: string;
  patient: string;
}

const APPOINTMENT_DATA: AppointmentElement[] = [
  {desc: 'Appointment 1', date: '11/22/18', patient: 'Cathy'},
  {desc: 'Appointment 2', date: '12/1/18', patient: 'Duke'},
  {desc: 'Appointment 3', date: '12/3/18', patient: 'Frank'},
  {desc: 'Appointment 4', date: '11/25/18', patient: 'Cathy'},
  {desc: 'Appointment 5', date: '11/26/18', patient: 'Bobby'},
  {desc: 'Appointment 6', date: '12/8/18', patient: 'Tammy'},
  {desc: 'Appointment 7', date: '12/6/18', patient: 'George'},
  {desc: 'Appointment 8', date: '1/2/19', patient: 'Duke'},
  {desc: 'Appointment 9', date: '11/28/18', patient: 'Frank'},
  {desc: 'Appointment 10', date: '11/23/18', patient: 'Bobby'},
];

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  chart = {};
  data = {};
  ctx: any;
  displayedColumns: string[] = ['desc', 'date', 'patient'];
  dataSource = APPOINTMENT_DATA;
  faCalendarCheck = faCalendarCheck;
  faUsers = faUsers;
  faBell = faBell;
  activeNoti: string;
  user: User;
  testUser;
  testUserData;
  caretaker: Caretaker;

  chartOptions = {
    responsive: false,
    legend: {
      display: true,
      labels: {
        fontColor: '#FFF',
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
      backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
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
      backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
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
    private messageService: MessageService
  ) { }

  ngOnInit() {
    try {
      this.activeData = this.ageData;
      this.activeNoti = 'notifications';
      this.drawChart();

      this.getUser('1');
      
    } catch (err) {
      console.log(err);
    }
  }

  getUser(uid: string): void {
    this.userService.getUser(uid).subscribe(user => {
      this.caretaker = user;
      console.log(user);
      
    });
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
      type: 'pie',
      data: this.activeData,
      options: this.chartOptions
    });
  }

}
