import { Categorie } from "./categorie.model";
import { Delegation } from "./delegation.model";
import { Famille } from "./famille.model";
import { Modele } from "./modele.model";
import { Moteur } from "./moteur.model";
import { User } from "./user.model";

export class Produit {
    
    idProduit : number;
    nomProduit : string;
    prixProduit : number;
    dateCreation : Date ;
    modeles : Modele[];
    categorie :Categorie;
    delegation : Delegation;
    carburant:string;
    description:string;
    user:User;
    annee:number;
}