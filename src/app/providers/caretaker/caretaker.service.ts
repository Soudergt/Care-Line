import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaretakerService {

  constructor(private http: HttpClient) { }

  public getCaretakers(id: string): Observable<any> {
    return this.http.get(
      `${environment.api}/caretaker/getCaretakers/${id}`
    ).pipe(map((body: {data: {caretakers: any}}) => {
      return body.data.caretakers;
    })); 
  }

  public getCaretaker(id: string): Observable<any> {
    return this.http.get(
      `${environment.api}/caretaker/${id}`
    ).pipe(map((body: {data: {caretaker: any}}) => {
      return body.data.caretaker;
    })); 
  }

  public addCaretaker(caretaker: any): Observable<any> {
    return this.http.post(`${environment.api}/caretaker/addCaretaker/`, caretaker);
  }
}
