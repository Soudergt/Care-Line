import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/classes/patient';
import { Caretaker } from './../../classes/caretaker';
import { PatientService } from 'src/app/providers/patient/patient.service';
import { CaretakerService } from 'src/app/providers/caretaker/caretaker.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input('type') type: string;
  activeList: any[];
  patients: Patient[];
  caretakers: Caretaker[];

  constructor(
    private router: Router,
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
    this.patientService.getPatients('1').subscribe(patients => {
      this.activeList = patients;
    });
  }

  getCaretakers(uid: string): void {
    this.caretakerService.getCaretakers('1').subscribe(caretakers => {
      this.activeList = caretakers;
    });
  }

  goToPatient(patient: Patient) {
    this.router.navigateByUrl(`/patient/${patient.id}`);
  }

  goToCaretaker(caretaker: Caretaker) {
    this.router.navigateByUrl(`/caretaker/${caretaker.id}`);
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
