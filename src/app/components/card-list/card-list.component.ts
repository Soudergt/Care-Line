import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/classes/patient';
import { Caretaker } from './../../classes/caretaker';
import { UserService } from 'src/app/providers/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './../../components/add-user-dialog/add-user-dialog.component';
import { User } from 'src/app/classes/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input('type') type: string;
  @Input('admin') admin: boolean;
  activeList: any[];
  patients: User[];
  caretakers: User[];

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
  }

  getPatients(): void {
    this.userService.getPatients().subscribe(patients => {
      this.activeList = patients;
    });
  }

  getCaretakers(): void {
    this.userService.getCaretakers().subscribe(caretakers => {
      this.activeList = caretakers;
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
          console.log(data);
          list.splice(index, 1);
          Swal.fire('Deleted!', user.NameFirst + ' ' + user.NameLast + ' has been deleted!', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', user.NameFirst + ' ' + user.NameLast + ' was not deleted!', 'error')
      }
    })
    
  }
}
