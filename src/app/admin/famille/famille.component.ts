import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Famille } from 'src/app/model/famille.model';
import { FamilleService } from 'src/app/services/famille.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {
familles:Famille[];
  constructor(private familleService : FamilleService,
    public authService : AuthService ) { }

  ngOnInit(): void {
    this.familleService.listeFamille().subscribe(f=>{
      this.familles=f;
    })
  }

}
