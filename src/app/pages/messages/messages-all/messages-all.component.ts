import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Message } from 'src/app/model/message.model';
import { User } from 'src/app/model/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-messages-all',
  templateUrl: './messages-all.component.html',
  styleUrls: ['./messages-all.component.css']
})
export class MessagesAllComponent implements OnInit {
  messages:Message[];
  messagesReceved:Message[];
  toutMessages:Message[];
  messagesEnvoyee:Message[];
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
    this.messageService.getByUser(this.authServices.loggedUser).subscribe(m=>{
      this.toutMessages=m.reverse();
    })
    this.messageService.getByEmiteur(this.authServices.loggedUser).subscribe(m=>{
      this.messagesReceved=m.reverse();
    })
    this.messageService.getByAuteur(this.authServices.loggedUser).subscribe(m=>{
      this.messagesEnvoyee=m.reverse();
    })
    this.userService.getUserByDiscussion(this.authServices.loggedUser).subscribe(u=>{
      this.contacts=u;
    })
    this.userService.getUserByUsername(this.authServices.loggedUser).subscribe(u=>{
      this.user=u;
    })
  }
  toDiscussion(param1:String){
  
    this.router.navigate(['/discussion',this.authServices.loggedUser,param1]).then(()=> {
      window.location.reload();
    });
   }

}
