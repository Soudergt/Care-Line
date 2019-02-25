import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/classes/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatients(uid: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      `/backend/patient/getPatient/${uid}`
    );
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(
      `/backend/patient/getPatient/${id}`
    );
  }

  addPatient(newPatient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${environment.api}/backend/patient/addPatient/`, newPatient);  
  }

  editPatient(selectedPatient: Patient) {
    return this.http.put(`${environment.api}/backend/patient/editPatient/`, selectedPatient);  
  }

  deletePatient(patientID: number) {
    return this.http.delete(`${environment.api}/backend/patient/deletePatient/${patientID}`);  
  }
}
