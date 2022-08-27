import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Cart } from 'src/app/model/cart.model';
import { Message } from 'src/app/model/message.model';
import { Produit } from 'src/app/model/produit.model';
import { User } from 'src/app/model/user.model';
import { ProduitService } from 'src/app/produit.service';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
term;
isLoading:boolean = false;
errTXT:string='';
user:User;
produits:Produit[];
pic: Boolean;
idCarts:string="idCarts";
idCartsCmd:string="idCartsCmd";
carts:Cart[];
cartsCmd:Cart[];
username:string;
messages:Message[];
form!:FormGroup;
initialText: string = '';
lastMsg:Message[];
  constructor(
    public userService: UserService,
    public authService: AuthService,
    private activatedRoute:ActivatedRoute,
    public produitService:ProduitService,
    private cartService:CartService,
    public messageService:MessageService,
    private toastr: ToastrService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params.user_id).
    subscribe( u =>{
      this.user=u;
      this.username=u.username;  
      this.CartCmd(this.username);
      this.CartenCours(this.username);  
this.initData();
      
      this.messageService.getByEmiteur(this.username).subscribe(m=>{
this.messages = m;

      })
  });
  this.produitService.listeProduitsByUser(this.activatedRoute.snapshot.params.user_id).subscribe(p=>{
    this.produits=p;
  })
  }
CartenCours(username:string){
  this.cartService.getByUsernameEnCours(username).subscribe(data=>{
    this.carts=data;
    console.log(this.carts);
        });

}
CartCmd(username:string){
 this.cartService.getByUsernameEnCommade(username).subscribe(d=>{
    this.cartsCmd=d;
    console.log(this.cartsCmd);
     });      
    
}

onSubmit(){
  const formData = new FormData();
  const message = this.messageService.dataForm.value;
  formData.append('message',JSON.stringify(message));

  this.messageService.message(formData).toPromise().then(data=>{
    console.log(data);  
    this.toastr.success('Message envoyé!');
    this.messages = [...this.messages, data];
   }
  ) 
  .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
    
  });
}

initData(){
  
    this.messageService.dataForm = this.formBuilder.group({
      auteur:new FormControl(this.authService.loggedUser), 
      emiter:new FormControl(this.user.user_id),
      message:new FormControl(""),
      dateCreation:new FormControl(new Date()),
        });

}

}
