import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/classes/patient';

const PATIENTS: Patient[] = [
  { id: 1, name: 'Cathy' },
  { id: 2, name: 'Bobby' },
  { id: 3, name: 'Tammy' },
  { id: 4, name: 'Frank' },
  { id: 5, name: 'Bethany' },
  { id: 6, name: 'George' },
  { id: 7, name: 'Susie' },
  { id: 8, name: 'Duke' },
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

  goToPatient() {
    this.router.navigateByUrl('/patient');
  }

}
