import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  isLoggedIn: boolean;
  name: String;

  constructor(
    public dialog: MatDialog,
    private router : Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.verifyLogin();
  }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate(['/']);
  }

}
