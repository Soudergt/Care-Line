import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) { }

  public getClinic(id: string): Observable<any> {
    return this.http.get(
      `${environment.api}/clinic/?id=${id}`
    ).pipe(map((body: {data: {clinic: any}}) => {
      return body.data.clinic;
    })); 
  }
}
