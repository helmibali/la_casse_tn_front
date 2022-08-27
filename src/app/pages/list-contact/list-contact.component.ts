import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {
contacts:Contact[];
  constructor(
    public contactService:ContactService
  ) { }

  ngOnInit(): void {
    this.contactService.getAll().subscribe(data=>{
      this.contacts=data;
    })
  }

}
