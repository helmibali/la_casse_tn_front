import { Component, Input, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/produit.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
@Input()
produit:Produit;
  constructor() { }

  ngOnInit(): void {
  }

}
