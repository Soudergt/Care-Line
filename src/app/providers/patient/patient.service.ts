import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatient(id: string): Observable<any> {
    return this.http.get(
      `http://0.0.0.0:3000/patient/getPatient/${id}`
    ).pipe(map((body: { data: { patient: any } }) => {
      return body.data.patient;
    }));
  }
}
