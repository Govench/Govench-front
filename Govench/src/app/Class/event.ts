import { Location } from "./location";
export class Event {
    id: number;
    tittle: string;
    description: string;
    date: string;         
    startTime: string;    
    endTime: string;     
    state: string;
    type: string;
    cost: number;
    exp: string;
    location: Location;    
}