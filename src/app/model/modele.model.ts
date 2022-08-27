import { Marque } from "./marque.model";
import { Produit } from "./produit.model";

export class Modele{
    id:number;
    libelleModele:string;
    marque_id:number;
    produits:Produit[];
    }