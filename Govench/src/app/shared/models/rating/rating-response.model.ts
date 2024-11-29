import { UserProfile } from "../user/user-profile-model";

export interface RatingResponse {
    ratingValue: number;
    idUserCalificador:number;
    userCalificador: string;
    userCalificadorProfile?:UserProfile;
    comment: string;
}