import { Observable } from 'rxjs';
import { UserService } from './../../providers/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  data: Observable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    try {
      this.userService.getUser('1').subscribe({
        error: (err) => {
          console.log(err);
        },
        next: user => this.data
      });
      console.log(this.data);
    } catch (err) {
      console.log(err);
    }
  }

}
