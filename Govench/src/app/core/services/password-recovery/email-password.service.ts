import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = `${environment.baseURL}/email`;
  private http = inject(HttpClient);

  constructor() { }

  emailExists(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/validation?email=${email}`;
    console.log('URL de validación:', url); // Verificar URL
    return this.http.get<boolean>(url);
  }

  sendPasswordResetMail(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/sendMail`, email);
  }

  checkTokenValidity(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/reset/check/${token}`);
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/reset/${token}`, newPassword, {
      responseType: 'text' as 'json'  // Se especifica que esperamos texto, no JSON
    });
  }
}
