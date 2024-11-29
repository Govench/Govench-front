import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RatingResponse } from '../../../shared/models/rating/rating-response.model';
import { RatingRequest } from '../../../shared/models/rating/rating-request.model';

@Injectable({
    providedIn: 'root'
})

export class RatingService {
    private baseURL = `${environment.baseURL}/user`;
    private http = inject(HttpClient);

    getRatingsByUserId(userId: number): Observable<RatingResponse[]>{
        return this.http.get<RatingResponse[]>(`${this.baseURL}/rated/${userId}`);
    }

    rateUser(userId: number, ratingRequest: RatingRequest): Observable<string> {
        return this.http.post(`${this.baseURL}/rate/${userId}`, ratingRequest, { responseType: 'text' });
    }

    existRating(ratedUserId:number):Observable<boolean>{
        return this.http.get<boolean>(`${this.baseURL}/existRate/${ratedUserId}`);
    }
}