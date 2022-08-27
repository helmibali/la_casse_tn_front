import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  constructor(private api:ApiService,private authService:AuthService,
    private router : Router,
    private userService: UserService) { }

  users:any[]=[];
  isLoading:boolean = false;
  errTXT:string='';

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.isLoading=true;
    this.authService.getUserslist().toPromise().then((res:any[])=>{
      console.log(res);
      this.users=res;
    })
    .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
      this.isLoading = false;
    })
  }

  supprimerUtilisateur(u:User){

    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.userService.supprimerUtilisateur(u.user_id).subscribe(()=>{
      console.log("produit supprimé");
    });
    this.router.navigate(['/utilisateurs']).then(()=> {
      window.location.reload();
    });
   }

}
