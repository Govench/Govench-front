import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  updateUserProfile(userId: number, data: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseURL}/${userId}`, data);
  }

  getProfileImage(userId: number): Observable<Blob> {
    return this.http.get(`${this.photoURL}/profile-photo/${userId}`, { responseType: 'blob' });
  }
 
  uploadProfileImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.photoURL}/upload/profile-photo`, formData,{ responseType: 'text' });
  }

  deleteProfileImage()
  {
    return this.http.delete(`${this.photoURL}/profile-photo/delete`,{ responseType: 'text' });
  }

  getAllUser(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(`${this.photoURL}/all`)
  }
  
  followUser(userId: number): Observable<string> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<string>(`${this.photoURL}/follow`, null, { params, responseType: 'text' as 'json' });
  }

  unfollowUser(userId: number): Observable<string> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.put<string>(`${this.photoURL}/unfollow`, null, { params, responseType: 'text' as 'json' });
  }
}
