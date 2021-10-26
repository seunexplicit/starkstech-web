import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  userDetails: any = {};

  constructor() { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('user_details'));
  }

}
