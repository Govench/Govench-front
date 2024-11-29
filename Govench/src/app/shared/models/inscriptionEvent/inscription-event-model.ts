import { Location } from "../location/location-model";

export interface Inscription {
    tittle: string;
    location: Location;
    type: string;
    date: string;
    startTime: string;
    registrationDate: string;
    link:string
    deleted:boolean
    eventId:number
}