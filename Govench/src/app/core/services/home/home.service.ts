import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsDetails } from '../../../shared/models/event/events-details.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseURL = `${environment.baseURL}/events`;
  constructor(private http:HttpClient) { }

  getEvents():Observable<EventsDetails[]>
  {
    return this.http.get<EventsDetails[]>(`${this.baseURL}`);
  }
}
