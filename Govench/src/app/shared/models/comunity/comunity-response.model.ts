import { PostResponse } from "../post/post-response.model";
import { OwnerResponse } from "./owner-response.model";

export interface ComunityResponse{
    id: number;
    name: string;
    descripcion: string;
    owner: OwnerResponse;
    tags: string[];
    post: PostResponse[];
}