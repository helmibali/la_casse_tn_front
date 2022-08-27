import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Marque } from 'src/app/model/marque.model';
import { MarqueService } from 'src/app/services/marque.service';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-add-modele',
  templateUrl: './add-modele.component.html',
  styleUrls: ['./add-modele.component.css']
})
export class AddModeleComponent implements OnInit {
marques:Marque[];
  constructor(
    private fb : FormBuilder,
    public modeleService : ModeleService,
    public marqueService : MarqueService,
    private router:Router,
  
  ) { }

  ngOnInit(): void {

    this.marqueService.getAll().subscribe(m=>{
      this.marques=m;
    })

    this.modeleService.dataForm = this.fb.group({
      id: null,
      libelleModele:[''],
      marque_id:null
      });
  }

  addData(){
    const formData = new FormData();
    const modele = this.modeleService.dataForm.value;
    formData.append('modele',JSON.stringify(modele));
   
    this.modeleService.ajouterCategorie(formData).subscribe(data=>{
      console.log(data);
      // this.router.navigate(['/modeles']);
    });
  }

}
