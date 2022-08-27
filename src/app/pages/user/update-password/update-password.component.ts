import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
user:User;
initForm: FormGroup;



  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute :ActivatedRoute,
    public authService :AuthService,
    private formBuilder:FormBuilder,


  ) { 
    
    this.userService.dataForm = this.formBuilder.group(
     {
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
     } 
    )
    
    
  }

  get oldPassword() { return this.userService.dataForm.get('oldPassword') }
  get password() { return this.userService.dataForm.get('password') }
  get repassword() { return this.userService.dataForm.get('repassword') }

  ngOnInit(): void {
    this.authService.getUserFromDB(this.authService.loggedUser).subscribe(u=>{
      this.user=u ;
      console.log(this.user.username);console.log(this.user.password);
    });

    console.log(this.authService.loggedUser);
 
    this.userService.dataForm = new FormGroup(
      {
        oldPassword: new FormControl('',[
          Validators.required,
          Validators.minLength(6)
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6)
        ]),
        repassword: new FormControl('',[
          Validators.required,
        ])
      }
    ) 

  }

//   updateData(){
//     this.authService.getUserFromDB(this.user,).subscribe(u=>{
//  this.router.navigate(['utilisateurs']);
//     },(error) => { alert("Problème lors de la modification !"); }
//     ); 
//    }

onClick(){
  console.log(this.user.password);
  console.log(this.user.user_id);
  const formData = new FormData();
  let user = this.userService.dataForm.value;
  
  formData.append('user',JSON.stringify(user));
  console.log(user)

  this.userService.updateImagePw(formData,this.user.user_id).subscribe(data=>{
    console.log(data);
    
    alert("votre mot de passe a été modifié avec succès");
    this.router.navigate(['/']);
    
  });
}

}
