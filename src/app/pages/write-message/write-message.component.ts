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
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {
  term;
  badge:string;
  badgeStatus:boolean;
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
      
this.initData();
      
      this.messageService.getByEmiteur(this.username).subscribe(m=>{
this.messages = m;

      })
  });

  }
  initData(){
  
    this.messageService.dataForm = this.formBuilder.group({
      auteur:new FormControl(this.authService.loggedUser), 
      emiter:new FormControl(this.user.user_id),
      message:new FormControl(""),
      dateCreation:new FormControl(new Date()),
      vu:new FormControl(false),
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

}
