import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Categorie } from 'src/app/model/categorie.model';
import { Delegation } from 'src/app/model/delegation.model';
import { Famille } from 'src/app/model/famille.model';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { Modele } from 'src/app/model/modele.model';
import { Moteur } from 'src/app/model/moteur.model';
import { ProduitService } from 'src/app/produit.service';
import { CatService } from 'src/app/services/cat.service';
import { DelegationService } from 'src/app/services/delegation.service';
import { FamilleService } from 'src/app/services/famille.service';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';
import { MarqueService } from 'src/app/services/marque.service';
import { ModeleService } from 'src/app/services/modele.service';


@Component({
  selector: 'app-ajouter-produit-front',
  templateUrl: './ajouter-produit-front.component.html',
  styleUrls: ['./ajouter-produit-front.component.css']
})
export class AjouterProduitFrontComponent implements OnInit {
  @Input()
  addButton;

  err:number = 0;
  erreur=0;
  isLoading:boolean = false;
  errTXT:string ='';


  moteursByModele:Moteur[];
  moteurs:Moteur[];
  categoriesByFamille:Categorie[];
  familles:Famille[];
  selectedMarque: any = {id:0, marqueLibelle:''};
  selectedMoteur: any = { id: 0, libelle: "" };
  selectedGouvernorat: any={id:0,  libelle:''};
  selectedDelegation: any={id:0,  libelle:''};
  selectedFamille: any = { id: 0, libelle: "" };
  selectedCategorie: any = { id: 0, nomCategorie: "" };

  modeles:Modele[];
  gouvernorats:Gouvernorat[];
  delegations:Delegation[];
  marques:any[];
  dropdownSettings;
  dropdownSettings2;
  categories: Categorie[];
  userFile ;
  imgURL: any;
  public imagePath;
  public message: string;
  constructor(
    public produitService:ProduitService,
              private router:Router,
              private formBuilder : FormBuilder,
              private modeleService : ModeleService,
              private marqueService : MarqueService,
              private authService : AuthService,
              private gouvernoratService : GouvernoratService,
              private delegationService : DelegationService,
              private familleService : FamilleService,
              private toastr: ToastrService,
              private catService : CatService,
  ) { }

  initForm(){
    this.produitService.dataForm = this.formBuilder.group({
      nomProduit:'',
      prixProduit:null,
      dateCreation:new Date(),
      modeles : [],
      carburant: '',
      description:'',
      categorie_id:null,
      annee:0,
      delegation_id:null,
      
     
     
      user:this.authService.loggedUser,
    })
  }

  ngOnInit(): void {

    this.initForm();


    this.produitService.listeCategories().subscribe(c=>{
      this.categories=c;})

    this.produitService.listeModele().subscribe(m=>{
      this.modeles=m;
    })

    this.marqueService.getAllMarques().subscribe(m=>{

      this.marques=m;
    })

    this.gouvernoratService.listeGouvernorats().subscribe(g=>{
      this.gouvernorats=g;
    })

    this.familleService.listeFamille().subscribe(f=>{
      this.familles = f;
    })
   

    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelleModele',
      selectAllText: 'Selectioner tout',
      unSelectAllText: 'déselectioner tout'
    };

    
    // this.dropdownSettings2 = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'libelle',
    //   selectAllText: 'Selectioner tout',
    //   unSelectAllText: 'déselectioner tout'
    // };
  
  
 

  }
  onSubmit(){
    const formData = new FormData();
    const produit = this.produitService.dataForm.value;
    formData.append('produit',JSON.stringify(produit));
    formData.append('file',this.userFile);
    this.produitService.createData(formData).toPromise().then(data=>{
      console.log(data); 
      this.router.navigate(['/']).then(()=> {
       
        window.location.reload();
        
      },
      );
       this.toastr.success('Annonce publié avec succé!'); 
    }
   
    ) 
    .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
      
    });
  
  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
  
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }  
}

// handleButtonClick(){
//   console.log('reactive form value ', this.form.value);
// //  console.log('Actual data ', this.getObjectListFromData(this.form.value.dropdownList.map(item => item.id )));
// }



onItemSelect($event){
  console.log('$event is ', $event); 
  
}

onMoteurSelect($event){
  console.log('$event is ', $event); 
}

getObjectListFromData(ids){
  return this.modeles.filter(item => ids.includes(item.id))
}
getOMoteurbjectListFromData(ids){
  return this.moteurs.filter(item => ids.includes(item.id))
}

onSelect(e){
  console.log(e.target.value);

  this.modeleService.getAllModelesByMarque_id(e.target.value).subscribe(data=>{
    this.modeles = data;
  })
}

onSelectGov(e){
  console.log(e.target.value);
  this.delegationService.ListDelegationByGouvernourat_id(e.target.value).subscribe(data=>{
    this.delegations = data;
    
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

}
