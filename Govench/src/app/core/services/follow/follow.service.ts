import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Follow } from '../../../shared/models/follow/follow.model';

@Injectable({
    providedIn: 'root'
})

export class FollowService {
  private baseURL = `${environment.baseURL}/user`;
  private http = inject(HttpClient);

    
  getFollowersDetails(): Observable<Follow[]>{
      return this.http.get<Follow[]>(`${this.baseURL}/followers`);
  }

  getFollowingDetails(): Observable<Follow[]>{
      return this.http.get<Follow[]>(`${this.baseURL}/followings`);
  }
    
}