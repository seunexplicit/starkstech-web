import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: '<div class="flex-row center-align center-justify h-100"><img src="assets/imgs/loader-2.gif" style="height:92px; width:92px" alt="loader"></div>',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
