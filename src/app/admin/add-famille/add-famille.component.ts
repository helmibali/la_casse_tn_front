import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Famille } from 'src/app/model/famille.model';
import { FamilleService } from 'src/app/services/famille.service';

@Component({
  selector: 'app-add-famille',
  templateUrl: './add-famille.component.html',
  styleUrls: ['./add-famille.component.css']
})
export class AddFamilleComponent implements OnInit {
  newFamille = new Famille();
  constructor(private familleService:FamilleService,
    private router:Router) { }

  ngOnInit(): void {
  }
  addCategorie(){
  this.familleService.ajouterCategorie(this.newFamille).subscribe(cat=> {
    console.log(cat);
    });
    this.router.navigate(['familles']);
  }
}
