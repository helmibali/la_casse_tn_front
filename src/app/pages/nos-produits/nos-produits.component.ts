import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categorie } from "src/app/model/categorie.model";
import { Delegation } from "src/app/model/delegation.model";
import { Famille } from "src/app/model/famille.model";
import { Gouvernorat } from "src/app/model/gouvernorat.model";
import { Marque } from "src/app/model/marque.model";
import { Modele } from "src/app/model/modele.model";
import { Moteur } from "src/app/model/moteur.model";
import { Produit } from "src/app/model/produit.model";
import { ProduitService } from "src/app/produit.service";
import { CatService } from "src/app/services/cat.service";
import { DelegationService } from "src/app/services/delegation.service";
import { FamilleService } from "src/app/services/famille.service";
import { GouvernoratService } from "src/app/services/gouvernorat.service";
import { MarqueService } from "src/app/services/marque.service";
import { ModeleService } from "src/app/services/modele.service";


@Component({
  selector: "app-nos-produits",
  templateUrl: "./nos-produits.component.html",
  styleUrls: ["./nos-produits.component.css"],
})
export class NosProduitsComponent implements OnInit {
  
  term;
  p: number = 1;
  moteurs:Moteur[];
  categories: Categorie[];
  familles:Famille[];
  marques: any[];
  produit: Produit;
  produits: Produit[];
  modeles: any[];
  modelesByMarque: any[];
  modele: Modele;
  gouvernourat: Gouvernorat;
  gouvernorats: Gouvernorat[];
  delegations: Delegation[];
  delegationsByGov: Delegation[];
  categoriesByFamille:Categorie[];
  moteursByModele:Moteur[];
  produitsCategorie: Produit[];
  selectedMarque: any = { id: 0, marqueLibelle: "" };
  selectedMoteur: any = { id: 0, libelle: "" };
  selectedGouvernorat: any = { id: 0, libelle: "" };
  selectedCategorie: any = { id: 0, nomCategorie: "" };
  selectedModele: any = { id: 0, libelleModele: "" };
  selectedDelegation: any = { id: 0, libelle: "" };
  selectedFamille: any = { id: 0, libelle: "" };
  constructor(
   
    private catService: CatService,
    private produitService: ProduitService,
    private marqueService: MarqueService,
    private modeleService: ModeleService,
    private govService: GouvernoratService,
    private delegationService: DelegationService,
    private familleService: FamilleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.CategoriesList();
    this.marquesList();
    this.modeleList();
    this.produitList();
    this.GouvernoratsList();
    this.DelegationsList();
    this.FamillesList();
   // this.onSelect(this.selectedMarque.id);
   // this.onSelectGov(this.selectedGouvernorat.id);
    console.log(this.selectedMarque.id);
  }
  FamillesList(){
    this.familleService.listeFamille().subscribe(f=>{
      this.familles = f;
      
    })
  }

  GouvernoratsList() {
    this.govService.listeGouvernorats().subscribe((g) => {
      this.gouvernorats = g;
      
    });
  }

  DelegationsList() {
    this.delegationService.ListeDelegation().subscribe((d) => {
      this.delegations = d;
    
    });
  }

  PrduitsCategorieList(id: number) {
    this.produitService.listeProduitsByCategorie(id).subscribe((data) => {
      this.produitsCategorie = data;
    });
  }

  CategoriesList() {
    this.catService.listeCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
  marquesList() {
    this.marqueService.getAllMarques().subscribe((m) => {
      this.marques = m;
      
    });
  }

  produitList() {
    this.produitService.listeProduits().subscribe((p) => {
      this.produits = p;
    });
  }
 

  modeleList() {
    this.modeleService.getAllModeles().subscribe((mo) => {
      this.modeles = mo;
    });
  }

  onSelect(e) {
    const a:any=e.target.value;
    this.modeleService
      .getAllModelesByMarque_id(a)
      .subscribe((data) => {
        this.modelesByMarque = data;
      });
    this.selectedMarque.id = a;
    console.log(this.selectedMarque.id);
  }

  onSelectGov(e) {
    console.log(e.target?.value);
    this.delegationService
      .ListDelegationByGouvernourat_id(e.target.value)
      .subscribe((data) => {
        this.delegationsByGov = data;
      });
    this.selectedGouvernorat.id = e.target.value;
  }

  onSelectByFamille(e){
    console.log(e.target.value);
    this.catService
      .listeCategorieByFamille(e.target.value)
      .subscribe((data) => {
        this.categoriesByFamille = data;
      });
    this.selectedFamille.id = e.target.value;
  }

  onSelectByMod(e) {
   
    this.selectedModele.id = e.target.value;
  }
  onSelectByMoteur(e) {
    this.selectedMoteur.id = e.target.value;
  }
  onSelectByCat(e) {
    this.selectedCategorie.id = e.target.value;
  }

  onSelectByDelegation(e) {
    this.selectedDelegation.id = e.target.value;
  }

  

  produitsByDate(): Produit[] {
    return this.produits.sort(
      (a, b) =>
        new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
    );
  }

  reInitFilter(){
    this.selectedCategorie==0;
    this.selectedMarque==0;
    this.selectedModele==0;
    this.selectedGouvernorat==0;
    this.selectedDelegation==0;
    // this.produitList();
    this.router.navigate(['/']).then(()=> {
      window.location.reload();
    });
    
  }
  onSubmit(){
    if (this.selectedModele.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0){
       this.produitService.listeProduitsByCategorie(this.selectedCategorie.id).subscribe(data=>{
     this.produits = data;
    })
//   }else  if (this.selectedCategorie.id==0 &&this.selectedModele.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0){
//     this.produitService.listeProduits().subscribe(data=>{
//   this.produits = data;
//  })
}

  
  else if(this.selectedCategorie.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0 && this.selectedModele.id==0){
    this.produitService.listeProdduitsByMarque(this.selectedMarque.id).subscribe(d=>{
  this.produits =d;
    })
   }
   else if(this.selectedCategorie.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0){
    this.produitService.listeProdduitsByModele(this.selectedModele.id).subscribe(d=>{
      this.produits=d;
    })
   }
  
   else if(this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0 && this.selectedModele.id==0){
    this.produitService.listeProdduitsByMarqueAndCategorie(this.selectedMarque.id,this.selectedCategorie.id).subscribe(d=>{
  this.produits =d;
    })
    }

    else if(this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0){
      this.produitService.listeProdduitsByModeleAndCategorieAndMarque(this.selectedModele.id,this.selectedCategorie.id,this.selectedMarque.id).subscribe(d=>{
    this.produits =d;
      })
      }
  
  
  
    else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0){
      this.produitService.listeProdduitsByGouvernorat(this.selectedGouvernorat.id).subscribe(d=>{
        this.produits=d;
      })
        }
  
        else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 && this.selectedDelegation.id==0){
          this.produitService.listeProdduitsByGouvernoratAndMarque(this.selectedGouvernorat.id,this.selectedMarque.id).subscribe(d=>{
            this.produits=d;
          })
            }
  
          
  
            else if(this.selectedModele.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0){
              this.produitService.listeProdduitsByGouvernoratAndCategorie(this.selectedGouvernorat.id,this.selectedCategorie.id).subscribe(data=>{
                  this.produits = data;
                })
             
               }
  
               else if(this.selectedCategorie.id==0 && this.selectedDelegation.id==0){
                this.produitService.ProdByModGov(this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id).subscribe(p=>{
                  this.produits=p;
                })
              }
             
              
  
    else if(this.selectedDelegation.id==0){
      this.produitService.listeProdduitsByModeleAndCategorieAndGouvernorat(this.selectedModele.id,this.selectedCategorie.id,this.selectedGouvernorat.id).subscribe(p=>{
        this.produits = p;
      })
  
    }
  
    else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 && this.selectedMarque.id==0){
      this.produitService.listeProdduitsByGouvernoratAndDelegation(this.selectedGouvernorat.id,this.selectedDelegation.id).subscribe(data=>{
          this.produits = data;
        })
       }
       else if(this.selectedModele.id==0  && this.selectedMarque.id==0){
        this.produitService.listeProdduitsByDelegationAndCategorie(this.selectedDelegation.id,this.selectedCategorie.id).subscribe(data=>{
            this.produits = data;
          })
       
         }
         
       else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 ){
        this.produitService.listeProdduitsByGouvernoratAndDelegationAndMarque(this.selectedGouvernorat.id,this.selectedMarque.id,this.selectedDelegation.id).subscribe(d=>{
      this.produits =d;
        })
      }
  
      else if(this.selectedCategorie.id==0){
        this.produitService.listeProdduitsByDelegationAndModeles(this.selectedDelegation.id,this.selectedModele.id).subscribe(d=>{
      this.produits =d;
        })
      }
  
    else{
      this.produitService.listeProdduitsByModeleAndCategorieAndGouvernoratAndDelegation(this.selectedModele.id,this.selectedCategorie.id,this.selectedGouvernorat.id,this.selectedDelegation.id).subscribe(p=>{
        this.produits = p;
      })
  
    }
  }

  filter2(){
    this.router
    .navigate(['/nos-produits-filtree',this.selectedFamille.id,this.selectedCategorie.id,this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id,this.selectedDelegation.id]).then(()=> {
      window.location.reload();
    });
  }
  
 
}