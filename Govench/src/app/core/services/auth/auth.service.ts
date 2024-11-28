import { inject, Injectable, Injector } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AuthRequest } from '../../../shared/models/auth/auth-request-model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth/auth-response-model';
import { RegisterRequest } from '../../../shared/models/register/register-request-model'; 
import { UserProfile } from '../../../shared/models/user/user-profile-model';
import { CommunityStateService } from '../comunity/comunity-state.service';
import { UpdatePassword } from '../../../shared/models/auth/updatePassword-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseURL = `${environment.baseURL}/auth`;
  private baseURL2 = `${environment.baseURL}/user`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private injector = inject(Injector);

  private get communityStateService(): CommunityStateService {
    return this.injector.get(CommunityStateService);
  }
  
  login(autRequest : AuthRequest) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseURL}/login`,autRequest).pipe(
      tap(response => {this.storageService.setAuthData(response);
        this.communityStateService.loadJoinedCommunitiesState();
      })
    )
  }

  register(registerRequest: RegisterRequest) : Observable<UserProfile>{
    return this.http.post<UserProfile>(`${this.baseURL}/register/participant`,
      registerRequest);
  }

  updatePassword(updatePassword: UpdatePassword) : Observable<String>{
    return this.http.put(`${this.baseURL2}/edit-password`, updatePassword, { responseType: 'text' });
  }

  logout()
  {
    this.communityStateService.clearUserState();
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

  getCurrentUserId(): number | null {
    const user = this.getUser(); 
    return user ? user.id : null;
  }

}
