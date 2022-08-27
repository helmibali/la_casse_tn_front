import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';

@Component({
  selector: 'app-add-gouvernorat',
  templateUrl: './add-gouvernorat.component.html',
  styleUrls: ['./add-gouvernorat.component.css']
})
export class AddGouvernoratComponent implements OnInit {
newGouvernorat = new Gouvernorat();
  constructor(private gouvernoratService : GouvernoratService,
    private router:Router) { }

  ngOnInit(): void {
  }
  add(){
    this.gouvernoratService.ajouter(this.newGouvernorat).subscribe(d=> {
      console.log(d);
      });

      // this.router.navigate(['/']).then(()=> {
      //   window.location.reload();
      // });
    
  }
}
