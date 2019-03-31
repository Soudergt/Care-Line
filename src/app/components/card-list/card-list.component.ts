import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/classes/patient';
import { Caretaker } from './../../classes/caretaker';
import { UserService } from 'src/app/providers/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './../../components/add-user-dialog/add-user-dialog.component';
import { User } from 'src/app/classes/user';
import { Event } from 'src/app/classes/event';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input('type') type: string;
  @Input('admin') admin: boolean;
  @Output() eventList = new EventEmitter<Event[]>();
  @Output() patientList = new EventEmitter<User[]>();
  activeList: any[];
  patients: User[];
  caretakers: User[];
  events: any[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.type === 'patient') {
      this.getPatients();
    } else if (this.type === 'caretaker') {
      this.getCaretakers();
    }
    this.events = [];
  }

  getPatients(): void {
    this.userService.getPatients().subscribe(patients => {
      this.activeList = patients;
      this.activeList.forEach(patient => {
        patient.photo = `url(/assets/images/people/${patient.UserType.toLowerCase()}/${patient.NameFirst.toLowerCase()}${patient.NameLast.toLowerCase()}.png)`;
      });
      if (patients.length > 0) {
        patients.forEach((patient: User) => {
          if (patient.events.length > 0) {
            patient.events.forEach((event: Event) => {
              let newEvent:any = event;
              newEvent.EventTime = moment(newEvent.EventTime, 'HH:mm').format('h:mm a');
              newEvent.patient = {
                firstname: patient.NameFirst,
                lastname: patient.NameLast,
                id: patient.UserID
              }
              this.events.push(newEvent);
            });
          }
        });
      }
      this.eventList.emit(this.events);
      this.patientList.emit(patients);
    });
  }

  getCaretakers(): void {
    this.userService.getCaretakers().subscribe(caretakers => {
      this.activeList = caretakers;
      this.activeList.forEach(caretaker => {
        caretaker.photo = `url(/assets/images/people/${caretaker.UserType.toLowerCase()}/${caretaker.NameFirst.toLowerCase()}${caretaker.NameLast.toLowerCase()}.png)`;
      });
    });
  }

  goToPatient(patient: User) {
    this.router.navigateByUrl(`/patient/${patient.UserID}`);
  }

  goToCaretaker(caretaker: User) {
    this.router.navigateByUrl(`/caretaker/${caretaker.UserID}`);
  }

  addUser(userType: string): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
      data: {
        type: userType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (userType === 'patient') {
          this.userService.addUser(result).subscribe(newPatient => {
            this.patients.push(newPatient);
          });
        } else {
          this.userService.addUser(result).subscribe(newCaretaker => {
            this.caretakers.push(newCaretaker);
          });
        }    
      }
    });
  }

  editUser(user: User, list: User[], index: number) {
    this.userService.editUser(user).subscribe(updatedUser => {
      console.log(updatedUser);
      list[index] = updatedUser;
    });
  }

  deleteUser(user: User, list: User[], index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: user.NameFirst + ' ' + user.NameLast + ' will be deleted!',
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user).subscribe(data => {
          list.splice(index, 1);
          Swal.fire('Deleted!', user.NameFirst + ' ' + user.NameLast + ' has been deleted!', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', user.NameFirst + ' ' + user.NameLast + ' was not deleted!', 'error')
      }
    })
    
  }
}
