import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FacebookLoginProvider,  GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
socialUser:SocialUser;
  constructor(private router: Router,
    private socialService: SocialAuthService) { }

  ngOnInit(): void {
  }
  signInHandler(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/inscription-social').then();
      this.socialService.authState.subscribe((userSocial)=>{
        this.socialUser = userSocial;
        console.log(this.socialUser);
        
      })
    });
  }
  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialService.authState.subscribe((userSocial)=>{
          this.socialUser = userSocial;
          console.log(this.socialUser);
        // this.social.loginWithFacebook(data.authToken).subscribe(
        //   res => {
        //     console.log(res);
        //   }
        //);
      }
    );
  }
  );

}
}