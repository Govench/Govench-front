import { UserProfile } from "../user/user-profile-model";
import { UserBasic } from "./user-basic.model";

export interface PostResponse {
    id: number;
    body: string;
    autor: UserBasic;
    user?: UserProfile;
    comunidadId: number;
    created: string;
    updated: string;
}