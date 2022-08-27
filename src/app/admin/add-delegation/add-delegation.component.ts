import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegation } from 'src/app/model/delegation.model';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { DelegationService } from 'src/app/services/delegation.service';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';

@Component({
  selector: 'app-add-delegation',
  templateUrl: './add-delegation.component.html',
  styleUrls: ['./add-delegation.component.css']
})
export class AddDelegationComponent implements OnInit {
gouvernorats:Gouvernorat[];
newDelegation= new Delegation();
  constructor(private delegationService : DelegationService,
    private gouvernoratService : GouvernoratService,
    private router:Router) { }

  ngOnInit(): void {
    this.gouvernoratService.listeGouvernorats().subscribe(g=>{
      console.log(g);
      this.gouvernorats=g;
    })
  }

  addDelegation(){
    this.delegationService.ajouterDelegation(this.newDelegation).subscribe(d=> {
      console.log(d);
      });

      // this.router.navigate(['/delegation']).then(()=> {
      //   window.location.reload();
      // });
    
  }

}
