import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/classes/patient';

const PATIENTS: Patient[] = [
  { id: 1, name: 'Cathy', img: 'url(/src/assets/images/people/cathy.jpg)'},
  { id: 2, name: 'Bobby', img: 'url(/src/assets/images/people/bobby.jpg)' },
  { id: 3, name: 'Tammy', img: 'url(/src/assets/images/people/brenda.jpg)'},
  { id: 4, name: 'Frank', img: 'url(/src/assets/images/people/frank.jpg)' },
  // { id: 5, name: 'Bethany' },
  { id: 6, name: 'George', img: 'url(/src/assets/images/people/george.jpg)'},
  { id: 7, name: 'Patrick', img: 'url(/src/assets/images/people/patrick.jpg)'},
  { id: 8, name: 'Duke', img: 'url(/src/assets/images/people/duke.jpg)'},
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
