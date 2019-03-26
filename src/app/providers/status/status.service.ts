import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  public getStatus(uid: string, date: string): Observable<any> {
    return this.http.get(
      `/api/status/getStatus`, {params: new HttpParams().set('uid', uid).set('date', date), withCredentials: true}
    ).pipe(map((body: {data: {status: any}}) => {
      return body.data.status;
    })); 
  }

  public addStatus(user: User, status: any): Observable<any> {    
    return this.http.post(
      `/api/status/add`, { user, status },
      { withCredentials: true }
    ).pipe(map((body: {data: {newStatus: any}}) => {
      return body.data.newStatus;
    })); 
  }

  public editStatus(status: any): Observable<any> {    
    return this.http.put(
      `/api/status/edit`, { status },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedStatus: any}}) => {
      return body.data.updatedStatus;
    })); 
  }

  public deleteStatus(status: any): Observable<any> {    
    return this.http.post(
      `/api/status/delete`, { status },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedStatus: any}}) => {
      return body.data.removedStatus;
    })); 
  }
}
