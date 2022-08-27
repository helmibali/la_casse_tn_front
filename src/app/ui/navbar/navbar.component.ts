import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { $$ } from 'protractor';
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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input()
  term;
  @Input()
produits:Produit[];
  title= "Mes Produits";
  user:User;
  darkModeEnabled:boolean = false;
  msgBtn:boolean = false;
  addButton:string = "Publier une Annonce";
  carts:Cart[];
  messages:Message[];
  lastMsg:Message[];
  lastMsg2:Message[];
  lastMsg3:Message[];
  lastMsg4:Message[];
  messagesReceved:Message[];
  messagesRecevedUnread:Message[];
  badgeMsg:number;
  allD:any[];
  contacts:User[];
  count:number;
  
  
  constructor(
    private formBuilder : FormBuilder,
    public authService:AuthService,
     private router:Router,
     public userService: UserService,
     private produitService:ProduitService,
     private cartService:CartService,
     private messageService: MessageService) { }

  ngOnInit(): void {
    
    this.messageService.getByEmiteur(this.authService.loggedUser).subscribe(m=>{
      this.messagesReceved=m.reverse();
    })

    this.messageService.getByEmiteurUnread(this.authService.loggedUser).subscribe(m=>{
      this.messagesRecevedUnread=m.reverse();
    })

    this.cartService.getByUsername(this.authService.loggedUser).subscribe(data=>{
      this.carts=data;
          });

    this.produitService.listeProduits().subscribe((p) => {
      this.produits = p;
    });

    this.userService.getUserByDiscussion(this.authService.loggedUser).subscribe(u=>{
      this.contacts=u;
    })

  this.userService.getUserByUsername(this.authService.loggedUser).subscribe(u=>{
    this.user=u;
   
  })
  this.messageService.getByUser(this.authService.loggedUser).subscribe(u=>{
    this.messages=u;
    
    this.lastMsg3=this.messages.reverse();
    this.lastMsg =this.lastMsg3.filter(m=>(m.auteur.username !== this.authService.loggedUser) );
    console.log(this.lastMsg);
   this.lastMsg2 = this.lastMsg.reduce((finalArray, current) => {
    let obj = finalArray.find((item) => item.auteur.user_id === current.auteur.user_id);
    if (obj) {
      return finalArray;
    }
    return finalArray.concat([current]);
  }, []);


  
  })

  this.initData2();
  this.count;
  console.log( this.count);
  
  }

  logout(){
    this.authService.logout();
  }

  switch(){
    this.darkModeEnabled = ! this.darkModeEnabled;
  }

  viewProfile(){
    this.router.navigate(['/mon-compte',this.user.user_id]).then(()=> {
      window.location.reload();
    });
  }

  toDiscussion(param1:String){
  
    this.router.navigate(['/discussion',this.authService.loggedUser,param1]).then(()=> {
      window.location.reload();
    });
   }

removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}
removeDuplicates2(originalArray, prop ,prop2) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {

     lookupObject[originalArray[i][prop][prop2]] = originalArray[i];
  }

  for(i in lookupObject) {

      newArray.push(lookupObject[i]);
  }
   return newArray;
}



initData2(){
  
  this.messageService.dataForm2 = this.formBuilder.group({
    id:new FormControl(null),
    vu:new FormControl(true),
      });

}
onSubmit(m:Message){
  const formData = new FormData();
  const message = this.messageService.dataForm2.value;
  formData.append('message',JSON.stringify(message));

  this.messageService.read(formData,m.id).subscribe(data=>{
      
    console.log(data);
    this.messages = [...this.messages, data];
   
    
   }
  ) 
  
}
}
