import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { Modele } from '../model/modele.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: [
  ]
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();
  modeles:Modele[];
  dropdownSettings;
  categories: Categorie[];
  categorie: Categorie;
  userFile ;
  imgURL: any;
  public imagePath;
  public message: string;
  editProduit:FormGroup;

  constructor(public produitService:ProduitService,
              private activatedRoute:ActivatedRoute,
              private formBuilder : FormBuilder,
              private router:Router ) { 
        
                this.produitService.dataForm = this.formBuilder.group({
                  nomProduit:'',
                  prixProduit:null,
                  dateCreation:'',
                  modeles : [],
                  categorie_id:null,
                })
                
              }

       

  ngOnInit(): void {
        this.produitService.consulterProduit(this.activatedRoute.snapshot.params.id).subscribe(p=>{
         this.currentProduit=p;
         console.log(this.currentProduit);
  
         this.produitService.listeModele().subscribe(m=>{
          this.modeles=m;});
          this.produitService.listeCategories().subscribe(c=>{
            this.categories=c;});
          this.produitService.dataForm = new FormGroup({
            nomProduit:new FormControl(this.currentProduit.nomProduit),
          prixProduit:new FormControl(this.currentProduit.prixProduit),
          dateCreation:new FormControl(this.currentProduit.dateCreation),
          modeles : new FormControl(this.currentProduit.modeles),
          categorie_id : new FormControl(this.currentProduit.categorie.id),
        });
      });
            
       // console.log(this.currentProduit)

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'libelleModele',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All'
        };

    
    
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

onItemSelect($event){
  console.log('$event is ', $event); 
}

getObjectListFromData(ids){
  return this.modeles.filter(item => ids.includes(item.id))
}

onSubmit(){
  const formData = new FormData();
  const produit = this.produitService.dataForm.value;
  formData.append('produit',JSON.stringify(produit));
  formData.append('file',this.userFile);
  this.produitService.updateData(formData,this.currentProduit.idProduit).subscribe(data=>{
    console.log(data);
    this.router.navigate(['/produits']);
    window.location.reload();
  });
}


}
