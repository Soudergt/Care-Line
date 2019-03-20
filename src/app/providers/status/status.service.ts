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
      `/api/status/getStatus`, {params: new HttpParams().set('uid', uid).set('date', date)}
    ).pipe(map((body: {data: {events: any}}) => {
      return body.data.events;
    })); 
  }

  public addStatus(status: any, uid: number): Observable<any> {    
    return this.http.post(
      `/api/status/add`, { status, uid }
    ).pipe(map((body: {data: {status: any}}) => {
      return body.data.status;
    })); 
  }

  public editStatus(status: any): Observable<any> {    
    return this.http.put(
      `/api/status/edit`, { status }
    ).pipe(map((body: {data: {status: any}}) => {
      return body.data.status;
    })); 
  }

  public deleteStatus(id: number): Observable<any> {    
    return this.http.post(
      `/api/status/delete`, { status }
    ).pipe(map((body: {data: {status: any}}) => {
      return body.data.status;
    })); 
  }
}
