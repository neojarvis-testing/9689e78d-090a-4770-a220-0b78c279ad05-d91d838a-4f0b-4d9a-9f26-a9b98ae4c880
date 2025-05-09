import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userRole:string;
  constructor() { }

  ngOnInit(): void {
    this.userRole=localStorage.getItem('currentuserRole');
  }

}
