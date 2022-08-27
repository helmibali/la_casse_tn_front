import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
 newUser = new User();
  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ajoutUser(){
    this.authService.addUser(this.newUser).subscribe(user => {
     console.log(user); 
    });
    this.router.navigate(['login'])
  }

}
