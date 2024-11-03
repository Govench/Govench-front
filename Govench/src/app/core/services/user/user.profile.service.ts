import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '../../../shared/models/user/user-profile-model';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseURL = `${environment.baseURL}/user/profile`;
  private photoURL =`${environment.baseURL}/user`;
  private http = inject(HttpClient);

  constructor() { }
  
  getUserProfile(userId : number) : Observable<UserProfile>{
    return this.http.get<UserProfile>(`${this.baseURL}/${userId}`)
  }

  updateUserProfile(userId : number,data : UserProfile) : Observable<UserProfile>{
    return this.http.put<UserProfile>(`${this.baseURL}/${userId}`,data)
  }

  getProfileImage(userId: number): Observable<Blob> {
    return this.http.get(`${this.photoURL}/profile-photo/${userId}`, { responseType: 'blob' });
  }
}
