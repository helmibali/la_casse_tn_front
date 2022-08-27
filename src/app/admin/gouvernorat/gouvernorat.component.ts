import { Component, OnInit } from '@angular/core';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';

@Component({
  selector: 'app-gouvernorat',
  templateUrl: './gouvernorat.component.html',
  styleUrls: ['./gouvernorat.component.css']
})
export class GouvernoratComponent implements OnInit {
gouvernorats: Gouvernorat[];
  constructor(private gouvernoratService : GouvernoratService) { }

  ngOnInit(): void {
    this.gouvernoratService.listeGouvernorats().subscribe(g=>{
      this.gouvernorats=g;
    })
  }

}
