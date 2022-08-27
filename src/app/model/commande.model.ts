import { Cart } from "./cart.model";
import { Delegation } from "./delegation.model";

import { User } from "./user.model";

export class Commande {
    id : number;
    qty : number;
    prixCommande:number;
     dateCreation:Date;
     user:User;
     carts:Cart[];
     livraison:string;
     delegation:Delegation;
     adresse :String;
}