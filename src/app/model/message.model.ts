import { User } from "./user.model";

export class Message{
    id:number;
    message:string;
    auteur:User;
    emiter:User;
    dateCreation:Date;
    vu:boolean;
}