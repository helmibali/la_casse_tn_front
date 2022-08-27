import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {
  userFile ;
  imgURL: any;
  public imagePath;
  public message: string;
  currentUser:User;
  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder : FormBuilder,


  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params.user_id).subscribe(u=>{
      this.currentUser=u;
    })
    this.userService.dataForm = this.formBuilder.group({

    })
  }
  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
  
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }  
}

onSubmit(){
  const formData = new FormData();
  const user = this.userService.dataForm.value;
  formData.append('user',JSON.stringify(user));
  formData.append('file',this.userFile);
  this.userService.updateImageUser(formData,this.currentUser.user_id).subscribe(data=>{
    console.log(data);
    this.router.navigate(['/utilisateurs']);
    window.location.reload();
  });
}
}
