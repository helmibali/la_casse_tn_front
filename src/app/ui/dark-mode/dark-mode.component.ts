import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css']
})
export class DarkModeComponent implements OnInit {
  darkModeEnabled:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  switch(){
    this.darkModeEnabled = ! this.darkModeEnabled;
  }

}
