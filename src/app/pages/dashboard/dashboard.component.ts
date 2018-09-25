import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    try {
      this.data = this.dashboardService.getDash();
      
    } catch (err) {
      console.log(err);
    }
  }

}
