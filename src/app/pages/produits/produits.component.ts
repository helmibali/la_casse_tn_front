import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Marque } from 'src/app/model/marque.model';
import { Modele } from 'src/app/model/modele.model';
import { Produit } from 'src/app/model/produit.model';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  addButton:string = "Ajouter";
  produits: Produit[];
  modeles: Modele[];
  marque:Marque;
  p:number=1;
  constructor(private produitService : ProduitService,
              private router : Router,
              public authService:AuthService) {
    //this.produits = produitService.listeProduits();
   }

   ngOnInit(): void {
    this.produitService.listeProduits().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
    console.log(this.authService.isAdmin())
  }

   supprimerProduit(p:Produit){

    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.produitService.supprimerProduit(p.idProduit).subscribe(()=>{
      console.log("produit supprimé");
    });
    this.router.navigate(['produits']).then(()=> {
      window.location.reload();
    });
   }



}
