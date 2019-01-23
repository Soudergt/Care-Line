import { Clinic } from './../../classes/clinic';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './../../components/add-user-dialog/add-user-dialog.component';
import { UserService } from 'src/app/providers/user/user.service';
import { User } from 'src/app/classes/user';

const CLINIC: Clinic = {
  id: 1,
  name: 'Careline Clinic',
  address: '123 Clinic Way, Cincinnati OH 45219',
  img: "url('/assets/images/people/default.png')"
}

export interface data {
  user: any;
}

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  clinic: Clinic;
  lat: number;
  lng: number;
  newUser: any;
  users: User[];

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.lat = 51.673858;
    this.lng = 7.815982;
    this.clinic = CLINIC;
  }

  addUser(userType: string): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
      data: {
        type: userType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userService.addUser(result)
        .subscribe(user => {
          console.log(user);
          
          this.users.push(user)
        });
    });
  }

}
