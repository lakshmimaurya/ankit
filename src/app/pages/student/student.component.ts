import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");
  }

}
