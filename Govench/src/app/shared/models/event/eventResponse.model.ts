import { Location } from "../location/location-model";

export interface EventResponse{

    id: number;
    tittle: String;
    description: String;
    date: String;
    startTime: String;
    endTime: String;
    type: String;
    cost: number;
    location: Location;
    exp: String;
    maxCapacity: number;
    registeredCount: number;
    ownerId: number;

}
