import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class NeedsService {

  constructor(private http: HttpClient) { }

  public getNeeds(uid: string): Observable<any> {
    return this.http.get(
      `/api/needs/getNeeds`, 
      {params: new HttpParams().set('uid', uid), withCredentials: true}
    ).pipe(map((body: {data: {status: any}}) => {
      return body.data.status;
    })); 
  }

  public addNeeds(user: User, needs: any): Observable<any> {
    return this.http.post(
      `/api/needs/add`, { user, needs },
      { withCredentials: true }
    ).pipe(map((body: {data: {newNeed: any}}) => {
      return body.data.newNeed;
    })); 
  }

  public editNeeds(needs: any): Observable<any> {    
    return this.http.put(
      `/api/needs/edit`, { needs },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedNeed: any}}) => {
      return body.data.updatedNeed;
    })); 
  }

  public deleteNeeds(needs: any): Observable<any> {    
    return this.http.post(
      `/api/needs/delete`, { needs },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedNeed: any}}) => {
      return body.data.removedNeed;
    })); 
  }
}
