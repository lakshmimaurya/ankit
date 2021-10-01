import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { myEvent } from 'src/app/admin/event/event.model';
import { EventService } from 'src/app/admin/event/event.service';

declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: myEvent[] = [];
  singleEvent: myEvent;
  private eventsSub: Subscription;
  constructor(private eventsService: EventService) { }

  ngOnInit() {
    $('#main-menu').removeClass("show");

    this.eventsService.getEvents();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((events: myEvent[]) => {
        this.events = events;
        this.singleEvent= events[0];
      });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if ($('.modal.in, .modal.show').length) {
      window.history.forward();
      $('.modal').modal('hide');
    }
  }

  viewEvent(eventId: string) {
    this.eventsService.getEvent(eventId).subscribe(eventData => {
      console.log(this.singleEvent);

      this.singleEvent.title = eventData.title;
      this.singleEvent.start = eventData.start;
      this.singleEvent.end = eventData.end;
      this.singleEvent.entryFees = eventData.entryFees;
      this.singleEvent.registrationLink = eventData.registrationLink;
      this.singleEvent.venue = eventData.venue;
      this.singleEvent.description = eventData.description;
      this.singleEvent.personOne = eventData.personOne;
      this.singleEvent.personOneContact = eventData.personOneContact;
      this.singleEvent.personOneEmail = eventData.personOneEmail;
      this.singleEvent.personTwo = eventData.personTwo;
      this.singleEvent.personTwoContact = eventData.personOneEmail;
      this.singleEvent.personTwoEmail = eventData.personTwoEmail;
      this.singleEvent.bannerImagePath = eventData.bannerImagePath;
      this.singleEvent.phoneBannerImagePath = eventData.phoneBannerImagePath;
      this.singleEvent.prize1 = eventData.prize1;
      this.singleEvent.prize2 = eventData.prize2;
      this.singleEvent.prize3 = eventData.prize3;
      console.log(this.singleEvent);
    });
  }
}
