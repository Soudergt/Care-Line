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
      `/api/need/getNeeds`, 
      {params: new HttpParams().set('uid', uid), withCredentials: true}
    ).pipe(map((body: {data: {needs: any}}) => {
      return body.data.needs;
    })); 
  }

  public addNeed(need: any): Observable<any> {
    return this.http.post(
      `/api/need/add`, { need },
      { withCredentials: true }
    ).pipe(map((body: {data: {newNeed: any}}) => {
      return body.data.newNeed;
    })); 
  }

  public editNeed(need: any): Observable<any> {    
    return this.http.put(
      `/api/need/edit`, { need },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedNeed: any}}) => {
      return body.data.updatedNeed;
    })); 
  }

  public deleteNeed(need: any): Observable<any> {    
    return this.http.post(
      `/api/need/delete`, { need },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedNeed: any}}) => {
      return body.data.removedNeed;
    })); 
  }
}
