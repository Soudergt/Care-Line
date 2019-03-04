import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  public getFeedback(uid: string): Observable<any> {
    return this.http.get(
      `${environment.api}/feedback/?uid=${uid}`
    ).pipe(map((body: {data: {feedback: any}}) => {
      return body.data.feedback;
    })); 
  }

  public addFeedback(feedback: any): Observable<any> {    
    return this.http.post(`${environment.api}/feedback/addFeedback/`, feedback);
  }
}
