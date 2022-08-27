import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Categorie } from 'src/app/model/categorie.model';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-liste-categorie',
  templateUrl: './liste-categorie.component.html',
  styleUrls: ['./liste-categorie.component.css']
})
export class ListeCategorieComponent implements OnInit {
categories:Categorie[];
  constructor(private catService:CatService,
               private authService:AuthService,
               private router : Router) { }

  ngOnInit(): void {
    this.catService.listeCategories().subscribe(cats => {
      console.log(cats);
      this.categories = cats;
    });
  }

  supprimerCategorie(c:Categorie){

    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.catService.supprimerCategorie(c.id).subscribe(()=>{
      console.log("Catégorie supprimé");
    });
    this.router.navigate(['categories']).then(()=> {
      window.location.reload();
    });
   }

}
