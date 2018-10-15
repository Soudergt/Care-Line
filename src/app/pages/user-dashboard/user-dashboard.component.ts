import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../providers/dashboard/dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  data: String;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    try {
      this.data = this.dashboardService.getDash();
    } catch (err) {
      console.log(err);
    }
  }

}
