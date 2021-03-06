import { Clinic } from './../../classes/clinic';
import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/providers/clinic/clinic.service';

export interface data {
  user: any;
}

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  clinic: Clinic;
  clinicPhoto: string;
  lat: number;
  lng: number;
  newUser: any;

  constructor(
    private clinicService: ClinicService
  ) { }

  ngOnInit() {
    this.lat = 51.673858;
    this.lng = 7.815982;
    this.getClinic(1);
  }

  getClinic(id: number): void {
    this.clinicService.getClinic(id).subscribe(clinic => {
      this.clinic = clinic;
      this.clinicPhoto = `url(/assets/images/clinic/${this.clinic.ClinicShortName.toLowerCase()}.png)`;
    });
  }
}
