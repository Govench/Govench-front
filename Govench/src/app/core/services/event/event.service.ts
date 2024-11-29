import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { EventRequest } from "../../../shared/models/event/eventRequest.model";
import { EventsDetails } from "../../../shared/models/event/events-details.model";
import { UploadMediaResponse } from "../../../shared/models/event/uploadMediaResponse.model";

@Injectable({
    providedIn: "root"
  })

export class EventService {

    private baseUrl = `${environment.baseURL}/admin/events`;
    private http = inject(HttpClient);

    private baseUrl2 = `${environment.baseURL}/events`;
    private fileUrl = `${environment.baseURL}/media`;
    
    crearEvento(eventRequest:EventRequest):Observable<EventsDetails>{
        return this.http.post<EventsDetails>(`${this.baseUrl}`,eventRequest)
    }

    eliminarEvento(id:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }

    updateEvent(id: number, eventRequest: EventRequest): Observable<EventsDetails> {
        return this.http.put<EventsDetails>(`${this.baseUrl}/${id}`, eventRequest);
    }

    getEventById(id: number): Observable<EventsDetails> {
        return this.http.get<EventsDetails>(`${this.baseUrl2}/${id}`);
      }
    uploadCover(file: File):Observable<UploadMediaResponse>
    {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadMediaResponse>(`${this.fileUrl}/upload`, formData);
    }

    getEventRatings(eventId: number): Observable<any> {
        const url = `${environment.baseURL}/events/${eventId}/ratings`;
        return this.http.get<any>(url);
      }

      rateEvent(eventId: number, ratingRequest: { valorPuntuacion: number }): Observable<string> {
        const url = `${environment.baseURL}/user/ratingEvent/${eventId}`;
        return this.http.post(url, ratingRequest, { responseType: 'text' });
      }
      
      
}
  