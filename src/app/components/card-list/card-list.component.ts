import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/classes/patient';
import { Caretaker } from './../../classes/caretaker';
import { PatientService } from 'src/app/providers/patient/patient.service';
import { CaretakerService } from 'src/app/providers/caretaker/caretaker.service';
import { UserService } from 'src/app/providers/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './../../components/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input('type') type: string;
  @Input('admin') admin: boolean;
  activeList: any[];
  patients: Patient[];
  caretakers: Caretaker[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private patientService: PatientService,
    private caretakerService: CaretakerService
  ) { }

  ngOnInit() {
    if (this.type === 'patient') {
      this.getPatients('1');
    } else if (this.type === 'caretaker') {
      this.getCaretakers('1');
    }
  }

  getPatients(uid: string): void {
    this.patientService.getPatients(uid).subscribe(patients => {
      this.activeList = patients;
    });
  }

  getCaretakers(uid: string): void {
    this.caretakerService.getCaretakers(uid).subscribe(caretakers => {
      this.activeList = caretakers;
    });
  }

  goToPatient(patient: Patient) {
    this.router.navigateByUrl(`/patient/${patient.id}`);
  }

  goToCaretaker(caretaker: Caretaker) {
    this.router.navigateByUrl(`/caretaker/${caretaker.id}`);
  }

  addUser(userType: string): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '600px',
      data: {
        type: userType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (userType === 'patient') {
        this.patientService.addPatient(result).subscribe(newPatient => {
          this.patients.push(newPatient);
        });
      } else {
        this.caretakerService.addCaretaker(result).subscribe(newCaretaker => {
          this.caretakers.push(newCaretaker);
        });
      }       
    });
  }

  editPatient(selectedPatient: Patient, index: number) {
    
  }

  deletePatient(patientID: number, index: number) {
    this.patientService.deletePatient(patientID).subscribe();
  }

  editCaretaker(selectedCaretaker: Caretaker, index: number) {
    
  }

  deleteCaretaker(caretakerID: number, index: number) {
    
  }

}
