import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Modele } from 'src/app/model/modele.model';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-list-modele',
  templateUrl: './list-modele.component.html',
  styleUrls: ['./list-modele.component.css']
})
export class ListModeleComponent implements OnInit {
modeles:Modele[];
  constructor(
    private authService: AuthService,
    private modeleService:ModeleService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.modeleService.getAll().subscribe(mod=>{
      this.modeles=mod;
    })
  }

}
