import { User } from "./user";

export interface Livestock {
    _id?:string;
    name:string;
    species:string,
    age:number;
    breed:string;
    healthCondition:string;
    location:string;
    vaccinationStatus:string;
    attachment:string;
    userId?:User
}
