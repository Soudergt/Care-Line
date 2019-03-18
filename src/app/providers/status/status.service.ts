import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  public getStatus(uid: string, date: string): Observable<any> {
    return this.http.get(
      `${environment.api}/status/getStatus`, {params: new HttpParams().set('uid', uid).set('date', date)}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public addStatus(status: any): Observable<any> {    
    return this.http.post(`${environment.api}/status/add`, status);
  }

  public editStatus(status: any): Observable<any> {    
    return this.http.put(`${environment.api}/stauts/edit`, status);
  }

  public deleteStatus(id: number): Observable<any> {    
    return this.http.delete(`${environment.api}/event/delete/${id}`);
  }
}
