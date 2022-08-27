import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegation } from 'src/app/model/delegation.model';
import { DelegationService } from 'src/app/services/delegation.service';

@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.css']
})
export class DelegationComponent implements OnInit {
  delegations:Delegation[];
  

  constructor(private delegationService : DelegationService,
    private router:Router) { }

  ngOnInit(): void {
    this.delegationService.ListeDelegation().subscribe(d=>{
      this.delegations= d;
    })
  }



}
