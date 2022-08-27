import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cartinCmd',
  templateUrl: './liste-cart-cmd.component.html',
  styleUrls: ['./liste-cart-cmd.component.css']
})
export class ListeCartCmdComponent implements OnInit {
  @Input()
  cartsCmd!:Cart[];
  user_id:number;
  constructor(
    private cartService:CartService,
    private authService:AuthService,
    private router : Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.prixVenteEstime();
  }
//  supprimerCart(c:Cart){
//     this.cartService.supprimerCart(c.id).subscribe(()=>{
//       console.log("produit supprimé");
//       this.cartsCmd = this.cartsCmd.splice(c.id);
//     });
  
//    }

  //  prixVenteEstime(){
  //   return this.cartsCmd.reduce(function(prixAchat, cart) {
  //     return prixAchat + (cart.prix);
  // }, 0);
  // }

 toProfile(user_id:number){
  
  this.router.navigate(['/profile',user_id]).then(()=> {
    window.location.reload();
  });
 }
}
