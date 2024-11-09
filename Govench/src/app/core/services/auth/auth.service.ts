import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AuthRequest } from '../../../shared/models/auth/auth-request-model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth/auth-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService)
  constructor() { }
  
  login(autRequest : AuthRequest) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseURL}/login`,autRequest).pipe(
      tap(response => this.storageService.setAuthData(response))
    )
  }

  logout()
  {
    this.storageService.clearAuthData();
  }

  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  getUser():AuthResponse | null {
    const authData= this.storageService.getAuthData();
    return authData ? authData : null;
  }

  getRole():String | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.role : null;
  }

}