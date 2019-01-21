import { Clinic } from './../../classes/clinic';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './../../components/add-user-dialog/add-user-dialog.component';

const CLINIC: Clinic = {
  id: 1,
  name: 'Careline Clinic',
  address: '123 Clinic Way, Cincinnati OH 45219',
  img: "url('/assets/images/people/default.png')"
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

  constructor(public dialog: MatDialog) { }

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
    });
  }

}
