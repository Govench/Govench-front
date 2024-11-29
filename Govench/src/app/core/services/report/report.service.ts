import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = `${environment.baseURL}/reports`;
  private http = inject(HttpClient);
  constructor() { }

  downloadGraphicReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf`, { responseType: 'blob' });
}
}
