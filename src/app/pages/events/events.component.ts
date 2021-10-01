import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");
  }

}
