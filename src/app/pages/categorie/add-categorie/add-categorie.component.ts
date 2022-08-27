import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { Famille } from 'src/app/model/famille.model';
import { CatService } from 'src/app/services/cat.service';
import { FamilleService } from 'src/app/services/famille.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
newCat = new Categorie();
familles:Famille[];
  constructor(private catService:CatService,private familleService : FamilleService,
              private router:Router) { }

  addCategorie(){
    this.catService.ajouterCategorie(this.newCat).subscribe(cat=> {
      console.log(cat);
      });
      // this.router.navigate(['categories']);
    }
             

  ngOnInit(): void {
    this.familleService.listeFamille().subscribe(f=>{
      this.familles = f;
    })
  }

}
