import { LocationDetails } from "./location-details.model";
export interface EventsDetails{
    id:number;
    tittle:string;
    description:string;
    date:string;
    startTime:string;
    endTime:string;
    type:string;
    cost :number;
    location:LocationDetails;
    exp:string;
    coverPath:string;
    maxCapacity:number;
    registeredCount:number;
    ownerId:number;
    deleted:boolean;
}