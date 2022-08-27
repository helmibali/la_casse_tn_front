import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-liste-cart',
  templateUrl: './liste-cart.component.html',
  styleUrls: ['./liste-cart.component.css']
})
export class ListeCartComponent implements OnInit {
@Input()
carts:Cart[];
@Input()
id!:String;

user_id:number;


  constructor(private cartService:CartService,
    private authService:AuthService,
    private router : Router,
    private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
   

    //this.prixVenteEstime();
  }

  // supprimerCart(c:Cart){

   
  //   this.cartService.supprimerCart(c.id).subscribe(()=>{
  //     console.log("produit supprimé");
  //     this.carts = this.carts.splice(c.id);
  //   });
  
  //  }

  //  prixVenteEstime(){
  //   return this.carts.reduce(function(prixAchat, cart) {
  //     return prixAchat + (cart.prix);
  // }, 0);
  // }

 toProfile(user_id:number){
  
  this.router.navigate(['/profile',user_id]).then(()=> {
    window.location.reload();
  });
 }
 //data-dismiss="modal"[routerLink]="['/profile',c.produit.user.user_id]"

}