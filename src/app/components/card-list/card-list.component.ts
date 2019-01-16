import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/classes/patient';
import { Caretaker } from './../../classes/caretaker';

const PATIENTS: Patient[] = [
  { id: 1, name: 'Cathy', img: 'url(/assets/images/people/patients/cathy.jpg)'},
  { id: 2, name: 'Bobby', img: 'url(/assets/images/people/patients/bobby.jpg)' },
  { id: 3, name: 'Tammy', img: 'url(/assets/images/people/patients/brenda.jpg)'},
  { id: 4, name: 'Frank', img: 'url(/assets/images/people/patients/frank.jpg)' },
  { id: 5, name: 'George', img: 'url(/assets/images/people/patients/george.jpg)'},
  { id: 7, name: 'Duke', img: 'url(/assets/images/people/patients/duke.jpg)'},
];
const CARETAKERS: Caretaker[] = [
  { id: 1, name: 'Howard', img: 'url(/assets/images/people/default.png)' },
  { id: 2, name: 'Franny', img: 'url(/assets/images/people/default.png)' },
  { id: 3, name: 'Monica', img: 'url(/assets/images/people/default.png)' },
  { id: 4, name: 'Taylor', img: 'url(/assets/images/people/default.png)' },
  { id: 5, name: 'Madison', img: 'url(/assets/images/people/default.png)' }
];

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input('type') type: string;
  activeList: any[];
  patients = PATIENTS;
  caretakers = CARETAKERS;

  constructor(private router: Router) { 
  }

  ngOnInit() {
    if (this.type === 'patient') {
      this.activeList = this.patients;
    } else if (this.type === 'caretaker') {
      this.activeList = this.caretakers;
    }
  }

  goToPatient(patient) {
    this.router.navigateByUrl(`/patient/${patient.id}`);
  }

}
