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

  public getClinic(id: number): Observable<Clinic> {
    return this.http.get(
      `${environment.api}/clinic/getClinic/?id=${id}`
    ).pipe(map((body: {data: {clinic: Clinic}}) => {
      return body.data.clinic;
    })); 
  }
}
