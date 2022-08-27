import { Article } from "./article.model";
import { User } from "./user.model";

export class Cmt{
    id :number;
    texte:string;
    user: User;
    article:Article;
    dateComment:Date;
    parentId: number;

}