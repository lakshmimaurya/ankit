import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    $(document).ready(function () {

      console.log("Ready!!!");

      $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'assets/lib/css/fontawesome/css/all.min.css') );

    });

  }
}

