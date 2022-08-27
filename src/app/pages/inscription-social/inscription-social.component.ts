import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Delegation } from 'src/app/model/delegation.model';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { Role } from 'src/app/model/role.model';
import { DelegationService } from 'src/app/services/delegation.service';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/auth.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';


@Component({
  selector: 'app-inscription-social',
  templateUrl: './inscription-social.component.html',
  styleUrls: ['./inscription-social.component.css']
})
export class InscriptionSocialComponent implements OnInit {
  socialUser:SocialUser;
  dropdownSettings;
  role:Role;
  roles:Role[];
  selectedRoles:Role[]=[{id:2,role:'USER'}];
  selectedGouvernorat: any={id:0,  libelle:''};
  gouvernorats:Gouvernorat[];
  delegations:Delegation[];
  isLoading:boolean = false;
  errTXT:string='';
  usernames:any[];
  email:any[];
  constructor(
    public customValidationService:CustomValidationService,
    private _location: Location,
    private socialService: SocialAuthService,
    public userService:UserService,
    private authService: AuthService,
    private gouvernoratService : GouvernoratService,
    private delegationService : DelegationService,
    private router: Router,
    public fb:FormBuilder) { }

  ngOnInit(): void {
   
    

    this.gouvernoratService.listeGouvernorats().subscribe(g=>{
      this.gouvernorats=g;
    });
    this.socialService.authState.subscribe((userSocial)=>{
      this.socialUser = userSocial;
      console.log(this.socialUser);
      
      this.userService.getAllUsername().subscribe(u=>{
      
        this.usernames=u.filter(u=>(u.username === this.socialUser.email) );})
      
      
    });
 



    
    this.infoForm();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role',
      selectAllText: 'Selectioner tout',
      unSelectAllText: 'déselectioner tout'
    };
  }

  infoForm(){
    this.socialService.authState.subscribe((userSocial)=>{
      this.socialUser = userSocial;
      console.log(this.socialUser);
      this.userService.dataForm = this.fb.group({
      prenom:new FormControl(this.socialUser.firstName),
      nom:new FormControl(this.socialUser.lastName),
      username: new FormControl(this.socialUser.email),
      password:new FormControl(this.socialUser.idToken),
      photoUrl:new FormControl(this.socialUser.photoUrl),
      roles:[],
      delegation_id:new FormControl(''),
      telephone:new FormControl(''),
      });
    });
  }


  addData(){

     const formData = new FormData();
     const user = this.userService.dataForm.value;
     formData.append('user',JSON.stringify(user));
    
     this.userService.createDataSocial(formData).subscribe(data=>{
     //  console.log(data);
     });
     this.router.navigate(['login']).then(()=> {
       window.location.reload();
     });
    
 

    
   }

   onItemSelect($event){
   // console.log('$event is ', $event); 
  }
  getObjectListFromData(ids){
    return this.roles.filter(item => ids.includes(item.id))
  }

  onSelectGov(e){
   // console.log(e.target.value);
    this.delegationService.ListDelegationByGouvernourat_id(e.target.value).subscribe(data=>{
      this.delegations = data;
      
    });
    this.selectedGouvernorat.id = e.target.value;
  }

  backClicked() {
    this._location.back();
  }

  usernameExist(username:string){
    this.userService.getAllUsername().subscribe(u=>{
      
      this.usernames=u.filter(u=>(u.username === username) );
       console.log(this.usernames);
       console.log(this.usernames.length)
      
    })
    
      
  } 

}
