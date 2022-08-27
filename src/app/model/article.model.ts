import { Cmt } from "./cmt.model";
import { User } from "./user.model";


export class Article {
    id:number;
    title:string;
    text:string;
    dateCreation:Date;
    comments:Cmt[];
    user:User;
}