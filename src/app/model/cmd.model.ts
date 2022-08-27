import { Cart } from "./cart.model";
import { Delegation } from "./delegation.model";
import { User } from "./user.model";

export class Cmd{
    id :number;
    user: User;
    delegation: Delegation;
    dateCreation:Date;
    qty:number;
    livraison:string;
    carts:Cart[];
    address :string;
    prixCommande:number;

}