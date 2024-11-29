import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RatingEventRequest } from '../../../shared/models/ratingEvent/ratingevent.model';

@Injectable({
  providedIn: 'root',
})
export class RatingEventService {

  private baseUrl = `${environment.baseURL}/ratingEvent`;
  private baseUrl2 = `${environment.baseURL}/user`;

  private http = inject(HttpClient);

  rateEvent(eventId: number, ratingRequest: RatingEventRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${eventId}`, ratingRequest);
  }

  verificationRating(eventId:number):Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl2}/verification/${eventId}`)
  }
  

}
