import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  roles:Role[];
  selectedRoles:Role[];
  dropdownSettings;

  currentUser = new User();
  public imagePath;
  imgURL: any;
  userFile ;
  public message: string;
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) {
    

   }

  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params.user_id).
    subscribe( u =>{
      this.currentUser=u;
      this.userService.getRoleslist().subscribe((r:any[])=>{
        console.log(r);
        this.roles=r;
        })  
  });
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'role',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All'
  };
}     


  updateData(){
   this.userService.updateRole(this.currentUser,this.currentUser.user_id).subscribe(u=>{
this.router.navigate(['utilisateurs']);
window.location.reload();
   },(error) => { alert("Problème lors de la modification !"); }
   ); 
  }

  onItemSelect($event){
    console.log('$event is ', $event); 
  }
  getObjectListFromData(ids){
    return this.roles.filter(item => ids.includes(item.id))
  }
}