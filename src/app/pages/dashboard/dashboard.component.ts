import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: {};

  constructor(dashboardService: DashboardService) {
    this.data = dashboardService.getDashboard();
    console.log(this.data);
    
  }

  ngOnInit() {


  }

}
