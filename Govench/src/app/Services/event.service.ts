import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../Class/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private  urlBd = "http://localhost:8080/api/v1/events";

  constructor(private httpClient : HttpClient) { 
    this.getevents();
  }
  
  getevents():Observable<Event[]>
  {
    return this.httpClient.get<Event[]>(`${this.urlBd}`); 
  }
  
  addevents()
  {
    this.getevents();
  }
  

}
