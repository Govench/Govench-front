import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Inscription } from '../../../shared/models/inscriptionEvent/inscription-event-model';
import { EventUser } from '../../../shared/models/userEvent/user-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventUserService{

    private baseURL = `${environment.baseURL}/inscription`;
    private baseURL2 = `${environment.baseURL}/events`;
    private adminURL = `${environment.baseURL}/admin/events`;
    
    
    private http = inject(HttpClient);

    constructor() { }


    getMyEventsInscriptions(): Observable<Inscription[]> {
        return this.http.get<Inscription[]>(`${this.baseURL}/myInscriptions`)
    }

    getMyEventsCreate(): Observable<EventUser[]> {
      return this.http.get<EventUser[]>(`${this.baseURL2}/myEvents`)
    }
    
    getMyEventsPast(): Observable<EventUser[]> {
      return this.http.get<EventUser[]>(`${this.baseURL}/history`)
    }

    deleteEvent(): Observable<EventUser[]>{
      return this.http.delete<EventUser[]>(`${this.adminURL}/{idevent}`)
    }
    
    inscribeInEvent(eventId:number):Observable<string>{
      return this.http.post<string>(`${this.baseURL}/${eventId}`,null, { responseType: 'text' as 'json' })
    }

  //   getEventRatings(eventId: number): Observable<any> {
  //     return this.http.get<any>(`/api/events/${eventId}/ratings`);
  // }  

  getEventRatings(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/events/${eventId}/ratings`);
  }  
  
}