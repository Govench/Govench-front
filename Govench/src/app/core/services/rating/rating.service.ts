import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RatingResponse } from '../../../shared/models/rating/rating-response.model';

@Injectable({
    providedIn: 'root'
})

export class RatingService {
    private baseURL = `${environment.baseURL}/user`;
    private http = inject(HttpClient);

    getRatingsByUserId(userId: number): Observable<RatingResponse[]>{
        return this.http.get<RatingResponse[]>(`${this.baseURL}/rated/${userId}`);
    }
}