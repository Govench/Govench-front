import { UserBasic } from "./user-basic.model";

export interface PostResponse {
    id: number;
    body: string;
    autor: UserBasic;
    comunidadId: number;
    created: string;
    updated: string;
}