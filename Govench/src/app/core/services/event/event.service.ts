import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { EventRequest } from "../../../shared/models/event/eventRequest.model";
import { EventResponse } from "../../../shared/models/event/eventResponse.model";

@Injectable({
    providedIn: "root"
  })

export class EventService {

    private baseUrl = `${environment.baseURL}/admin/events`;
    private http = inject(HttpClient);

    private baseUrl2 = `${environment.baseURL}/events`;
    
    crearEvento(eventRequest:EventRequest):Observable<EventResponse>{
        return this.http.post<EventResponse>(`${this.baseUrl}`,eventRequest)
    }

    eliminarEvento(id:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }

    updateEvent(id: number, eventRequest: EventRequest): Observable<EventResponse> {
        return this.http.put<EventResponse>(`${this.baseUrl}/${id}`, eventRequest);
    }

    getEventById(id: number): Observable<EventResponse> {
        return this.http.get<EventResponse>(`${this.baseUrl2}/${id}`);
      }
      
}
  