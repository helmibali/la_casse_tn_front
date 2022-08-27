import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Cart } from 'src/app/model/cart.model';
import { Delegation } from 'src/app/model/delegation.model';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { CartService } from 'src/app/services/cart.service';
import { CommandeService } from 'src/app/services/commande.service';
import { DelegationService } from 'src/app/services/delegation.service';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';

@Component({
  selector: 'app-cart-complete',
  templateUrl: './cart-complete.component.html',
  styleUrls: ['./cart-complete.component.css']
})
export class CartCompleteComponent implements OnInit {
  dropdownSettings;
  carts:Cart[];
  selectedGouvernorat: any={id:0,  libelle:''};
  gouvernorats:Gouvernorat[];
  delegations:Delegation[];
  isLoading:boolean = false;
  errTXT:string='';
  selectedCarts:Cart[];
  
  // prixAchat:number=0;
  constructor(
    private _location: Location,
    private cartService:CartService,
    private authService:AuthService,
    private gouvernoratService : GouvernoratService,
    private delegationService : DelegationService,
    public formBuilder:FormBuilder,
    private router:Router,
    public commandeService:CommandeService) { }

  ngOnInit(): void {

   

    this.gouvernoratService.listeGouvernorats().subscribe(g=>{
      this.gouvernorats=g;
    });

    

         
          this.initData();
          this.prixCart(); 
           
           
          
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'cart',
            selectAllText: 'Selectioner tout',
            unSelectAllText: 'déselectioner tout'
          };
  }
  supprimerCart(c:Cart){
      this.cartService.supprimerCart(c.id).subscribe(()=>{
        console.log("produit supprimé");
        window.location.reload();
      });
   }

   backClicked() {
    this._location.back();
  }
  prixCart(){
    return this.carts.reduce(function(prixAchat, cart) {
      return prixAchat + (cart.prix);
  }, 0);
  }
  onSelectGov(e){
    console.log(e.target.value);
    this.delegationService.ListDelegationByGouvernourat_id(e.target.value).subscribe(data=>{
      this.delegations = data;
      
    });
    this.selectedGouvernorat.id = e.target.value;
  }

initData(){
  this.cartService.getByUsername(this.authService.loggedUser).subscribe(data=>{
    this.carts=data;
    this.selectedCarts=data;
    this.commandeService.dataForm = this.formBuilder.group({
      prixCommande:new FormControl(this.prixCart()),
      dateCreation:new FormControl(new Date()),
      user:new FormControl(this.authService.loggedUser),
      carts:new FormControl([]),
      livraison:new FormControl("livreur"),
      qty:new FormControl(this.carts.length),
      address:new FormControl(""),
      delegation:new FormControl(0),

    })
    
  });

}

  addData(){
    const formData = new FormData();
    const commande = this.commandeService.dataForm.value;
    formData.append('commande',JSON.stringify(commande));
    this.commandeService.create(formData).subscribe(data=>{
      console.log(data);
    });
    // this.router.navigate(['/cart']).then(()=> {
    //   window.location.reload();
    // });
  
  
}

addToCart(){
  const formData = new FormData();
  const commande = this.commandeService.dataForm.value;
  formData.append('commande',JSON.stringify(commande));

  this.commandeService.create(formData).toPromise().then(data=>{
    console.log(data);  
  //  window.location.reload();
 
  this.router.navigate(['/nos-produits']);
  alert("Votre commande a été envoyé avec succé");
    //window.location.reload();
   }
  ) 
  .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
    
  });


}


onItemSelect($event){
  console.log('$event is ', $event); 
}
getObjectListFromData(ids){
  return this.carts.filter(item => ids.includes(item.id))
}

}
