import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent implements OnInit {
socialUser:SocialUser;
user = new User();
err:number = 0;
roles:Role[];
  constructor(
    private socialService: SocialAuthService,
    public userService:UserService,
    private router: Router,
    public fb:FormBuilder,
    private authService:AuthService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit(): void {
   
    this.socialService.authState.subscribe((userSocial)=>{
      this.socialUser = userSocial;
      console.log(this.socialUser);
      this.user.username  = this.socialUser.email;
      this.user.password  = this.socialUser.idToken;
    }); 
    // this.infoForm();
  }

  // infoForm(){
  //   this.socialService.authState.subscribe((userSocial)=>{
  //     this.socialUser = userSocial;
  //     console.log(this.socialUser);
  //     this.userService.dataForm = this.fb.group({
      
  //     username: new FormControl(this.socialUser.email),
  //     password:new FormControl(this.socialUser.idToken),
      
  //     roles:[]
  //     });
  //   });
  // }

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
    this.toastr.error('Vous n\'estes pas inscrit!');
  });


  }
  
}
