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
  patient;
  faNotesMedical = faNotesMedical;
  faInfo = faInfo;


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
 