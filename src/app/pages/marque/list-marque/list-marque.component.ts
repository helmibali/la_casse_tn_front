import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Marque } from 'src/app/model/marque.model';
import { MarqueService } from 'src/app/services/marque.service';

@Component({
  selector: 'app-list-marque',
  templateUrl: './list-marque.component.html',
  styleUrls: ['./list-marque.component.css']
})
export class ListMarqueComponent implements OnInit {
  marques:Marque[];
  marque:Marque;
  control: FormControl = new FormControl('');
  constructor(
    private authService : AuthService,
    private marqueService:MarqueService,
    private router:Router,
    public fb : FormBuilder,
  ) { }



  ngOnInit(): void {
   this.marqueService.getAll().subscribe(mq=>{
     console.log(mq);
     this.marques=mq;
   })
  }

  supprimerMarque(m:Marque){
  
    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.marqueService.supprimerProduit(m.id).subscribe(()=>{
      console.log("marque supprimé");
    });
    this.router.navigate(['marques']).then(()=> {
      window.location.reload();
    });
   }
  

}
