import { Component, OnInit } from '@angular/core';
import { Caretaker } from 'src/app/classes/caretaker';

@Component({
  selector: 'app-caretaker',
  templateUrl: './caretaker.component.html',
  styleUrls: ['./caretaker.component.scss']
})
export class CaretakerComponent implements OnInit {
  caretaker: Caretaker = {
    id: 10,
    fn: 'Taylor',
    ln: 'Williams',
    clinic: 'Careline Clinic',
    img: "url('/assets/images/people/caretakers/taylorwilliams.jpg')"
  };

  constructor() { }

  ngOnInit() {
  }

}
