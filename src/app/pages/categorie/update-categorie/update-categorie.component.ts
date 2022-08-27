import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie.model';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
currentCat = new Categorie();
  constructor(private catService: CatService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.catService.consulterCategorie(this.activatedRoute.snapshot.params.id)
    .subscribe(cat =>{ this.currentCat = cat;
    })
  }

  updateCategorie(){
    this.catService.updateCategorie(this.currentCat, this.currentCat.id).subscribe(cat=>{
      this.router.navigate(['categories']);
    }
    ,(error)=>{alert('Probléme lors de la modification')}
    )
  }

}
