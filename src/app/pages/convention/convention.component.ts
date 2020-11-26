import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css']
})
export class ConventionComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if($('.modal.in, .modal.show').length){
      window.history.forward();
      $('.modal').modal('hide');
    }
  }

}
