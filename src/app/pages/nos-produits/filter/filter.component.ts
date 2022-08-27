import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { Delegation } from 'src/app/model/delegation.model';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { Marque } from 'src/app/model/marque.model';
import { Modele } from 'src/app/model/modele.model';
import { Produit } from 'src/app/model/produit.model';
import { ProduitService } from 'src/app/produit.service';
import { CatService } from 'src/app/services/cat.service';
import { DelegationService } from 'src/app/services/delegation.service';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';
import { MarqueService } from 'src/app/services/marque.service';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  params:any;
  term;
  p:number=1;
  categories:Categorie[];
  marques:any[];
  produit:Produit;
  produitsfilter:Produit[];
  modeles:any[];
  modelesByMarque:any[];
  modele:Modele;
  gouvernourat:Gouvernorat;
  gouvernorats:Gouvernorat[];
  delegations:Delegation[];
  delegationsByGov:Delegation[];
  produitsCategorie: Produit[];
   selectedMarque: any = {id:0, marqueLibelle:''};
   selectedGouvernorat:any={id:0,libelle:""};
   selectedCategorie: any = {id:0, nomCategorie:''};
   selectedModele: any = {id:0, libelleModele:''};
   selectedDelegation: any = {id:0,libelle:''};
 
  constructor(
    private catService : CatService,
    private produitService : ProduitService,
    private marqueService : MarqueService,
    private modeleService : ModeleService,
    private govService : GouvernoratService,
    private delegationService : DelegationService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

 

    this.route.queryParams.subscribe((queryParams:any)=>{
      console.log('queryParams',queryParams);
      this.params = queryParams;
    })


    this.modeleService.getAllModelesByMarque_id(this.params.marque).subscribe(data=>{
      this.modelesByMarque = data; 
    });

    this.delegationService.ListDelegationByGouvernourat_id(this.params.gouvernorat).subscribe(data=>{
      this.delegationsByGov = data; });
    this.CategoriesList();
    this.marquesList();
    //this.modeleList();
    this.produitList();
    this.GouvernoratsList();
    this.onSelect(this.selectedMarque.id);
    this.onSelectGov(this.selectedGouvernorat.id); 
    

    }
  


  GouvernoratsList(){
    this.govService.listeGouvernorats().subscribe(g=>{
    this.gouvernorats = g;
    })
  }

  DelegationsList(){
    this.delegationService.ListeDelegation().subscribe(d=>{
    
      this.delegations= d;
    })

  }

  PrduitsCategorieList(id:number){
    this.produitService.listeProduitsByCategorie(id).subscribe(data=>{
    this.produitsCategorie=data;
    })
  }

  CategoriesList(){
    this.catService.listeCategories().subscribe(cats => {
      
      this.categories = cats;
    });
  }
marquesList(){
  this.marqueService.getAllMarques().subscribe(m=>{

    this.marques=m;
  })
}


produitList(){
  this.produitService.listeProduits().subscribe(p=>{
    
    this.produitsfilter=p;
  })
}

modeleList(){
  this.modeleService.getAllModeles().subscribe(mo=>{
    this.modeles=mo;
  })
}




onSelect(e){
  this.modeleService.getAllModelesByMarque_id(e.target.value).subscribe(data=>{
    this.modelesByMarque = data;
    
  });
  this.selectedMarque.id = e.target.value;
  
}

onSelectGov(e){
  console.log(e.target.value);
  this.delegationService.ListDelegationByGouvernourat_id(e.target.value).subscribe(data=>{
    this.delegationsByGov = data;
    
    
  });
  this.selectedGouvernorat.id = e.target.value;

}

onSelectByMod(e){
  console.log(e.target.value);
  this.selectedModele.id=e.target.value;  
}
onSelectByCat(e){
  this.selectedCategorie.id = e.target.value;
  
}



onSelectByDelegation(e){
  this.selectedDelegation.id = e.target.value;
}

onSubmit(){

  if (this.selectedModele.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0
    && this.params.modele == 0 && this.params.marque == 0 && this.params.delegation==0 && this.params.gouvernorat==0  ){
      // if (this.params.categorie !== 0){
        this.produitService.listeProduitsByCategorie(this.params.categorie).subscribe(data=>{
          this.produitsfilter = data;
         })
      // }else{
      //   this.produitService.listeProduitsByCategorie(this.selectedCategorie.id).subscribe(data=>{
      //     this.produitsfilter = data;
      //    })
      // };
        this.router.navigate(['/search'], { queryParams: 
          { Categorie: this.selectedCategorie.id,
            // Marque: this.selectedMarque.id ,
            // Modele: this.selectedModele.id,
            // Gouvernorat:this.selectedGouvernorat.id, 
            // Delegation:this.selectedDelegation.id 
           } });
     
}


// else if(this.selectedCategorie.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0 && this.selectedModele.id==0){
//   this.produitService.listeProdduitsByMarque(this.selectedMarque.id).subscribe(d=>{
// this.produitsfilter =d;
//   })
//  }
//  else if(this.selectedCategorie.id==0 && this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0){
//   this.produitService.listeProdduitsByModele(this.selectedModele.id).subscribe(d=>{
//     this.produitsfilter=d;
//   })
//  }

//  else if(this.selectedGouvernorat.id==0 && this.selectedDelegation.id==0){
//   this.produitService.listeProdduitsByMarqueAndCategorie(this.selectedMarque.id,this.selectedCategorie.id).subscribe(d=>{
// this.produitsfilter =d;
//   })
//   }



//   else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0){
//     this.produitService.listeProdduitsByGouvernorat(this.selectedGouvernorat.id).subscribe(d=>{
//       this.produitsfilter=d;
//     })
//       }

//     else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 && this.selectedDelegation.id==0){
//         this.produitService.listeProdduitsByGouvernoratAndMarque(this.selectedGouvernorat.id,this.selectedMarque.id).subscribe(d=>{
//           this.produitsfilter=d;
//         })
//           }

        

//     else if(this.selectedModele.id==0 && this.selectedDelegation.id==0 && this.selectedMarque.id==0){
//             this.produitService.listeProdduitsByGouvernoratAndCategorie(this.selectedGouvernorat.id,this.selectedCategorie.id).subscribe(data=>{
//                 this.produitsfilter = data;
//               })
           
//              }

//     else if(this.selectedCategorie.id==0 && this.selectedDelegation.id==0){
//               this.produitService.ProdByModGov(this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id).subscribe(p=>{
//                 this.produitsfilter=p;
//               })
//             }
//     else if(this.selectedDelegation.id==0 && this.selectedModele.id==0){
//               this.produitService.listeProdduitsByGouvernoratAndMarqueAndCategorie(this.selectedGouvernorat.id,this.selectedMarque.id,this.selectedCategorie.id)
//               .subscribe(p=>{
//                 this.produitsfilter=p;
//               })
//             }
          
           
            

//   else if(this.selectedDelegation.id==0){
//     this.produitService.listeProdduitsByModeleAndCategorieAndGouvernorat(this.selectedModele.id,this.selectedCategorie.id,this.selectedGouvernorat.id).subscribe(p=>{
//       this.produitsfilter = p;
//     })

//   }
//   else if(this.selectedModele.id==0 ){
//     this.produitService.listeProdduitsByGouvernoratAndDelegationAndMarqueAndCategorie(this.selectedGouvernorat.id,this.selectedMarque.id,this.selectedDelegation.id,this.selectedCategorie.id).subscribe(d=>{
//   this.produitsfilter =d;
//     })
//   }
 
//   else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 && this.selectedMarque.id==0){
//     this.produitService.listeProdduitsByGouvernoratAndDelegation(this.selectedGouvernorat.id,this.selectedDelegation.id).subscribe(data=>{
//         this.produitsfilter = data;
//       })
//      }
//    else if(this.selectedModele.id==0  && this.selectedMarque.id==0){
//       this.produitService.listeProdduitsByDelegationAndCategorie(this.selectedDelegation.id,this.selectedCategorie.id).subscribe(data=>{
//           this.produitsfilter = data;
//         })
     
//        }

//      else if(this.selectedCategorie.id==0 && this.selectedModele.id==0 ){
//       this.produitService.listeProdduitsByGouvernoratAndDelegationAndMarque(this.selectedGouvernorat.id,this.selectedMarque.id,this.selectedDelegation.id).subscribe(d=>{
//     this.produitsfilter =d;
//       })
//     }
//     else if(this.selectedCategorie.id==0){
//       this.produitService.listeProdduitsByDelegationAndModeles(this.selectedDelegation.id,this.selectedModele.id).subscribe(d=>{
//     this.produitsfilter =d;
//       })
//     }
 

  else{
    this.produitService.listeProdduitsByModeleAndCategorieAndGouvernoratAndDelegation(this.selectedModele.id,this.selectedCategorie.id,this.selectedGouvernorat.id,this.selectedDelegation.id).subscribe(p=>{
      this.produitsfilter = p;
    })

  }
}


// produitsByDate(): Produit[] {
//   return this.produits
//     .sort(
//       (a, b) =>
//         new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
//    );
// }

}
