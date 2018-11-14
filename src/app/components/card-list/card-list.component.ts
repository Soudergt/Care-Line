import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/classes/patient';

const PATIENTS: Patient[] = [
  { id: 1, name: 'Cathy', img: 'url(/assets/images/people/patients/cathy.jpg)'},
  { id: 2, name: 'Bobby', img: 'url(/assets/images/people/patients/bobby.jpg)' },
  { id: 3, name: 'Tammy', img: 'url(/assets/images/people/patients/brenda.jpg)'},
  { id: 4, name: 'Frank', img: 'url(/assets/images/people/patients/frank.jpg)' },
  // { id: 5, name: 'Bethany' },
  { id: 6, name: 'George', img: 'url(/assets/images/people/patients/george.jpg)'},
  { id: 7, name: 'Patrick', img: 'url/assets/images/people/patients/patrick.jpg)'},
  { id: 8, name: 'Duke', img: 'url(/assets/images/people/patients/duke.jpg)'},
];

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  patients = PATIENTS;

  constructor(
    private router: Router
    ) { }

  ngOnInit() {
  }

  goToPatient(patient) {
    this.router.navigateByUrl(`/patient/${patient.id}`);
  }

}
