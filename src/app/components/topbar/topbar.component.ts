import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { UserService } from 'src/app/providers/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  isLoggedIn: boolean;
  name: String;
  user: User;
  userPhoto: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(valid => {
      this.isLoggedIn = valid;
    });

    this.getActiveUser();
  }

  getActiveUser(): void {
    this.userService.getActiveUser().subscribe(user => {
      this.user = user;
      this.userPhoto = `url(/assets/images/people/${this.user.UserType.toLowerCase()}/${this.user.NameFirst.toLowerCase()}${this.user.NameLast.toLowerCase()}.png)`;
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout().subscribe();
    this.router.navigate(['/login']);
  }

}
