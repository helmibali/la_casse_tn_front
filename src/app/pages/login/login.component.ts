
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import {  GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user = new User();
err:number = 0;
roles:Role[];

socialUser: SocialUser;

  constructor(private authService:AuthService,
              private router:Router,
              private toastr: ToastrService,
               private socialService: SocialAuthService,
              private userService:UserService
              ) {}
  ngOnInit(): void {

    this.userService.getRoleslist().subscribe((r:any[])=>{
      this.roles=r;
      console.log(r);
     });
  }


  onLoggedin()
  {
  this.authService.login(this.user).subscribe((data)=> {
  let jwToken = data.headers.get('Authorization');
  this.authService.saveToken(jwToken);
  this.authService.getUserFromDB(this.user.username).subscribe(user=>{
    this.authService.signIn(user);
    this.toastr.success('Bienvenue!');
  })
  this.router.navigate(['/']);
  },(erreur)=>{ this.err = 1;
    this.toastr.error('Merci de verifier');
  });


  }
  
  signInHandler(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/verification').then();
      this.socialService.authState.subscribe((userSocial)=>{
        this.socialUser = userSocial;
        console.log(this.socialUser);
        
      })
    });
  }





  
  // onLoggedin()
  //   {
  //     this.authService.login(this.user).subscribe({
  //       next: (data) => {
  //         let jwToken = data.headers.get('Authorization')!;
  //         this.authService.saveToken(jwToken);
  //          this.router.navigate(['/']); 
  //       },
  //       error: (err: any) => {
  //       this.err = 1; 
  //       }
  //       });   
  //   }

}
