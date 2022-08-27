import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    public contactService: ContactService,
    public fb:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.contactService.dataForm = this.fb.group({
      // id: null,
      prenom:'',
      nom:'',
      email:'',
      message:'',
      });
  }

  addData(){
    const formData = new FormData();
    const contact = this.contactService.dataForm.value;
    formData.append('contact',JSON.stringify(contact));
  
    this.contactService.createData(formData).subscribe(data=>{
      console.log(data);
      alert("Votre message a été envoyer avec succès");
      this.router.navigate(['/']);
    });
  }

}
