import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Message } from 'src/app/model/message.model';
import { User } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  messages:Message[];
emiter:User;
auteur : User;
user: User;
contacts:User[];
term;
errTXT:string='';
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    public messageService:MessageService,
    public authServices:AuthService,
    private userServices:UserService,
    private toastr: ToastrService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    
 this.userService.getUserByUsername(this.activatedRoute.snapshot.params.auteur).subscribe(u=>{
  this.emiter=u;
 this.initData();
 })
 this.userService.getUserByUsername(this.activatedRoute.snapshot.params.emiter).subscribe(u=>{
  this.auteur=u;
 })
this.messageService.getDiscussion(this.activatedRoute.snapshot.params.auteur,this.activatedRoute.snapshot.params.emiter).subscribe(d=>{
this.messages=d;
console.log(d);
})

this.userService.getUserByDiscussion(this.authServices.loggedUser).subscribe(u=>{
  this.contacts=u;
})


  }
  toDiscussion(param1:String){
  
    this.router.navigate(['/discussion',this.authServices.loggedUser,param1]).then(()=> {
      window.location.reload();
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
    auteur:new FormControl(this.authServices.loggedUser), 
    emiter:new FormControl(this.emiter.user_id),
    message:new FormControl(""),
    dateCreation:new FormControl(new Date()),
      });

}
}
