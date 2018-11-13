import { PatientService } from './../../providers/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faNotesMedical, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  sub;
  id;
  faNotesMedical = faNotesMedical;
  faInfo = faInfo;
  patient = {
    fn: 'Duke',
    mi: 'L.',
    ln: 'James',
    clinic: 'Careline Clinic',
    bday: 'May, 5, 1942',
    gender: 'male',
    bloodtype: 'O+',
    height: "6'0''",
    weight: '160 lbs',
    emergency: {
      fn: 'Lauren',
      ln: 'James',
      address: '127 Oak Lane, Cincinnati, Ohio, 44221',
      phone: '111-111-1111',
      email: 'lauren.james@email.com'
    }
  };
  

  constructor(private activatedRoute: ActivatedRoute, private patientService:PatientService) { }

  ngOnInit() {
    // this.sub = this.activatedRoute.params.subscribe(params => {
    //   this.id = params['id'];
    //   this.patientService.getPatient(this.id).subscribe(patient => {
    //     this.patient = patient;
    //     console.log(this.patient);
    //   });
    // });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
 