import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team = [
    {
      id: "1",
      title: "Lakshmi Maurya",
      designation: "Website & Technical Lead",
      thumb: "lakshmi.jpg"
    },
    {
      id: "2",
      title: "Jatin Bagga",
      designation: "Public Relations Lead",
      thumb: "bagga.jpeg"
    },
    {
      id: "3",
      title: "Debaangshu Sen",
      designation: "Designing Lead",
      thumb: "deb.jpg"
    },
    {
      id: "4ng build",
      title: "Aditya Negi",
      designation: "Finance Lead",
      thumb: "aditya.jpeg"
    }
  ]
  constructor() { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");
  }

}
