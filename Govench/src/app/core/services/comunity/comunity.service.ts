import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ComunityResponse } from '../../../shared/models/comunity/comunity-response.model';
import { UserComunity } from '../../../shared/models/comunity/UserComunity-response.model';

@Injectable({
    providedIn: 'root'
})

export class ComunityService{


    private baseURL = `${environment.baseURL}/community`;
    private baseURL2 = `${environment.baseURL}/admin/usercommunity`;
    private http = inject(HttpClient);

    getAllCommunities(): Observable<ComunityResponse[]>{
        return this.http.get<ComunityResponse[]>(`${this.baseURL}/communities`);
    }

    getCommunityById(id: number): Observable<ComunityResponse>{
        return this.http.get<ComunityResponse>(`${this.baseURL}/search/${id}`);
    }

    getCommunitiesByUser(): Observable<ComunityResponse[]> {
        return this.http.get<ComunityResponse[]>(`${this.baseURL}/my-communities`);
      }

    updateCommunity(id: number, community: any): Observable<ComunityResponse> {
      return this.http.put<ComunityResponse>(`${this.baseURL}/update/${id}`, community);
    }

    deleteCommunity(id: number): Observable<any> {
        return this.http.delete(`${this.baseURL}/delete/${id}`);
      }

  getComunitiesPertainByUser(): Observable<UserComunity[]> {
    return this.http.get<UserComunity[]>(`${this.baseURL2}/pertains`);
  }

  joinCommunity(idcommunity: number): Observable<string> {
    return this.http.post(`${this.baseURL2}/${idcommunity}`, {}, {
      responseType: 'text'
    });
  }
  leaveCommunity(idUser: number, idCommunity: number): Observable<string> {
    return this.http.delete(`${this.baseURL2}/${idUser}/${idCommunity}`, {
      responseType: 'text'
    });
  }
    
}
