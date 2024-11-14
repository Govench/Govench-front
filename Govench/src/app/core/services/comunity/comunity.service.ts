import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ComunityResponse } from '../../../shared/models/comunity/comunity-response.model';

@Injectable({
    providedIn: 'root'
})

export class ComunityService{

    private baseURL = `${environment.baseURL}/community`;
    private http = inject(HttpClient);

    getAllCommunities(): Observable<ComunityResponse[]>{
        return this.http.get<ComunityResponse[]>(`${this.baseURL}/communities`);
    }

    getCommunityById(id: number): Observable<ComunityResponse>{
        return this.http.get<ComunityResponse>(`${this.baseURL}/search/${id}`);
    }
}
