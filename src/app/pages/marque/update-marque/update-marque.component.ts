import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marque } from 'src/app/model/marque.model';
import { MarqueService } from 'src/app/services/marque.service';

@Component({
  selector: 'app-update-marque',
  templateUrl: './update-marque.component.html',
  styleUrls: ['./update-marque.component.css']
})
export class UpdateMarqueComponent implements OnInit {
  currentMarque = new Marque();
  public imagePath;
  imgURL: any;
  userFile ;
  public message: string;

  constructor(public marqueService : MarqueService,
    public fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    ) {
      this.marqueService.dataForm = this.fb.group({
        libelleMarque: new FormControl(this.currentMarque.libelleMarque),
      })
     }

    ngOnInit(): void {
      this.marqueService.consulterMarque(this.activatedRoute.snapshot.params.id).
    subscribe( marq =>{
       this.currentMarque = marq;
       this.marqueService.dataForm = new FormGroup({
        id:new FormControl (this.currentMarque.id),
        libelleMarque: new FormControl(this.currentMarque.libelleMarque),
         });
          });
     }
   
    addData(){
      const formData = new FormData();
      const marque = this.marqueService.dataForm.value;
      formData.append('marque',JSON.stringify(marque));
      formData.append('file',this.userFile);
      this.marqueService.updateMarque(formData).subscribe(data=>{
       // console.log(data);
        this.router.navigate(['/marques']);
      });
    }
    onSelectFile(event) {
      if (event.target.files.length > 0)
      {
        const file = event.target.files[0];
        this.userFile = file;
    
   
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
   
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }  
  }

}
