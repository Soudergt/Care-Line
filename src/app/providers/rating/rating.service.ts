import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  public getCaretakerRatings(uid: string): Observable<any> {
    return this.http.get(
      `/api/rating/caretaker/getRatings/?uid=${uid}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {ratings: any}}) => {
      return body.data.ratings;
    })); 
  }

  public getCaretakerRating(id: string): Observable<any> {
    return this.http.get(
      `/api/rating/caretaker/getRating/?id=${id}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {ratings: any}}) => {
      return body.data.ratings;
    })); 
  }

  public addCaretakerRating(rating: any): Observable<any> {
    return this.http.post(
      `/api/rating/caretaker/add`, { rating },
      { withCredentials: true }
    ).pipe(map((body: {data: {newRating: any}}) => {
      return body.data.newRating;
    })); 
  }

  public editCaretakerRating(rating: any): Observable<any> {
    return this.http.put(
      `/api/rating/caretaker/edit`, { rating },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedRating: any}}) => {
      return body.data.updatedRating;
    })); 
  }

  public deleteCaretakerRating(rating: any): Observable<any> {
    return this.http.post(
      `/api/rating/caretaker/delete`, { rating },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedRating: any}}) => {
      return body.data.removedRating;
    })); 
  }

  public getClinicRatings(uid: string): Observable<any> {
    return this.http.get(
      `/api/rating/clinic/getRatings/?uid=${uid}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {ratings: any}}) => {
      return body.data.ratings;
    })); 
  }

  public getClinicRating(id: string): Observable<any> {
    return this.http.get(
      `/api/rating/clinic/getRating/?id=${id}`,
      { withCredentials: true }
    ).pipe(map((body: {data: {ratings: any}}) => {
      return body.data.ratings;
    })); 
  }

  public addClinicRating(id: number, rating: any): Observable<any> {
    return this.http.post(
      `/api/rating/clinic/add`, { id, rating },
      { withCredentials: true }
    ).pipe(map((body: {data: {newRating: any}}) => {
      return body.data.newRating;
    })); 
  }

  public editClinicRating(rating: any): Observable<any> {
    return this.http.put(
      `/api/rating/clinic/edit`, { rating },
      { withCredentials: true }
    ).pipe(map((body: {data: {updatedRating: any}}) => {
      return body.data.updatedRating;
    })); 
  }

  public deleteClinicRating(rating: any): Observable<any> {
    return this.http.post(
      `/api/rating/clinic/delete`, { rating },
      { withCredentials: true }
    ).pipe(map((body: {data: {removedRating: any}}) => {
      return body.data.removedRating;
    })); 
  }
}
