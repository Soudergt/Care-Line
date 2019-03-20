import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Clinic } from 'src/app/classes/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) { }

  public getClinic(id: number): Observable<any> {
    return this.http.get(
      `/api/clinic/getClinic/?id=${id}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {clinic: Clinic}}) => {
      return body.data.clinic;
    })); 
  }

  public addClinic(clinic: Clinic): Observable<any> {    
    return this.http.post(
      `/api/clinic/add`, { clinic },
      { withCredentials: true }
    ).pipe(map((body: {data: {newClinic: Clinic}}) => {
      return body.data.newClinic;
    })); 
  }

  public editClinic(clinic: Clinic): Observable<any> {
    return this.http.put(
      `/api/clinic/edit`, { clinic },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedClinic: Clinic}}) => {
      return body.data.updatedClinic;
    })); 
  }

  public deleteClinic(clinic: Clinic): Observable<any> {
    return this.http.post(
      `/api/user/delete`, { clinic },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedClinic: Clinic}}) => {
      return body.data.removedClinic;
    }));
  }
}
