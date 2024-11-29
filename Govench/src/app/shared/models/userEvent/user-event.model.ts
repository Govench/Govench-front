import { Location } from "../location/location-model";

export interface EventUser{
    id:number;
    tittle: string;
    location: Location;
    type: string;
    startTime: string;
    date:string;
    deleted:boolean;
}