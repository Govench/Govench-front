import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {
  private baseURL = `${environment.baseURL}/email`;

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseURL}/forgot-password/${email}`, {}, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  resetPassword(token: string, newPassword: string): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseURL}/reset-password/${token}/${newPassword}`, {}, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  validateToken(token: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.baseURL}/validate?token=${token}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}