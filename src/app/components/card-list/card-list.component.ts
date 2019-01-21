import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/classes/patient';
import { Caretaker } from './../../classes/caretaker';

const PATIENTS: Patient[] = [
  {
    id: 1,
    fn: 'Cathy',
    mi: '',
    ln: '',
    clinic: '',
    bday: '',
    gender: '',
    bloodtype: '',
    height: '',
    weight: '',
    img: 'url(/assets/images/people/patients/cathy.jpg)',
    emergency: {
      fn: '',
      ln: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  {
    id: 2,
    fn: 'Bobby',
    mi: '',
    ln: '',
    clinic: '',
    bday: '',
    gender: '',
    bloodtype: '',
    height: '',
    weight: '',
    img: 'url(/assets/images/people/patients/bobby.jpg)',
    emergency: {
      fn: '',
      ln: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  {
    id: 3,
    fn: 'Tammy',
    mi: '',
    ln: '',
    clinic: '',
    bday: '',
    gender: '',
    bloodtype: '',
    height: '',
    weight: '',
    img: 'url(/assets/images/people/patients/brenda.jpg)',
    emergency: {
      fn: '',
      ln: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  {
    id: 4,
    fn: 'Frank',
    mi: '',
    ln: '',
    clinic: '',
    bday: '',
    gender: '',
    bloodtype: '',
    height: '',
    weight: '',
    img: 'url(/assets/images/people/patients/frank.jpg)',
    emergency: {
      fn: '',
      ln: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  {
    id: 5,
    fn: 'George',
    mi: '',
    ln: '',
    clinic: '',
    bday: '',
    gender: '',
    bloodtype: '',
    height: '',
    weight: '',
    img: 'url(/assets/images/people/patients/george.jpg)',
    emergency: {
      fn: '',
      ln: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  {
    id: 6,
    fn: 'Duke',
    mi: '',
    ln: '',
    clinic: '',
    bday: '',
    gender: '',
    bloodtype: '',
    height: '',
    weight: '',
    img: 'url(/assets/images/people/patients/duke.jpg)',
    emergency: {
      fn: '',
      ln: '',
      address: '',
      phone: '',
      email: ''
    }
  },
];
const CARETAKERS: Caretaker[] = [{
    id: 1,
    fn: 'Howard',
    ln: '',
    img: 'url(/assets/images/people/default.png)'
  },
  {
    id: 2,
    fn: 'Franny',
    ln: '',
    img: 'url(/assets/images/people/default.png)'
  },
  {
    id: 3,
    fn: 'Monica',
    ln: '',
    img: 'url(/assets/images/people/default.png)'
  },
  {
    id: 4,
    fn: 'Taylor',
    ln: '',
    img: 'url(/assets/images/people/default.png)'
  },
  {
    id: 5,
    fn: 'Madison',
    ln: '',
    img: 'url(/assets/images/people/default.png)'
  }
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
