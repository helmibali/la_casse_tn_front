import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { Modele } from 'src/app/model/modele.model';
import { Produit } from 'src/app/model/produit.model';
import { ProduitService } from 'src/app/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  modeles:Modele[];
  dropdownSettings;
  categories: Categorie[];
  userFile ;
  imgURL: any;
  public imagePath;
  public message: string;

 

  constructor(public produitService:ProduitService,
              private router:Router,
              private formBuilder : FormBuilder,
            ) { }

            initForm(){
              this.produitService.dataForm = this.formBuilder.group({
                nomProduit:'',
                prixProduit:null,
                dateCreation:new Date(),
                modeles : [],
                categorie_id:null,
              })
            }

  

  ngOnInit(): void {
    this.initForm();

    this.produitService.listeCategories().subscribe(c=>{
      this.categories=c;})

    this.produitService.listeModele().subscribe(m=>{
      this.modeles=m;
     
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelleModele',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
  
  
 

  }

  onSubmit(){
    const formData = new FormData();
    const produit = this.produitService.dataForm.value;
    formData.append('produit',JSON.stringify(produit));
    formData.append('file',this.userFile);
    this.produitService.createData(formData).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/produits']);
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

getObjectListFromData(ids){
  return this.modeles.filter(item => ids.includes(item.id))
}






      // addProduit(){
    //   console.log(this.newProduit);
      // this.produitService.consulterCategorie(this.newIdCat).subscribe(c=>{
      //   console.log(c);
      //   this.newCategorie=c;
      // });
      // this.newProduit.categorie=this.newCategorie;
    //   this.produitService.ajouterProduit(this.newProduit).subscribe(prod=> {
    //     console.log(prod);
    //   });
    //   this.router.navigate(['produits']);
    // }  

    










  // setDefaultSelection(){
  //   let item = this.modeles[0];
  //   this.produitService.dataForm.patchValue({
  //     modeles : [{
  //       id : item['id'],
  //       libelleModele : item['libelleModele']
  //     }]  
  //   })
 // }

  


}
