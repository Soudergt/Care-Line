import { Clinic } from './../../classes/clinic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  clinic: Clinic = {
    id: 1,
    name: 'Careline Clinic',
    address: '123 Clinic Way, Cincinnati OH 45219',
    img: {
      path: "url('/assets/images/people/caretakers/taylorwilliams.jpg')"
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
