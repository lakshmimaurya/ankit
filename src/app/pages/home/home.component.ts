import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { myEvent } from 'src/app/admin/event/event.model';
import { EventService } from 'src/app/admin/event/event.service';
import { BannerService } from 'src/app/banner.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  banners = {
    homeBannerPath: '',
    phoneBannerPath: ''
  };

  events: myEvent[] = [];
  private eventsSub: Subscription;


  constructor(private banner: BannerService, private eventsService: EventService) { }

  ngOnInit(): void {
  
    document.body.classList.add('bg-home');
  
    $('#main-menu').removeClass("show");

    this.banner.getBanner().subscribe(bannerData => {
      this.banners.homeBannerPath = bannerData.banners.homeBannerPath;
      this.banners.phoneBannerPath = bannerData.banners.phoneBannerPath;
    });


    this.eventsService.getEvents();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((events: myEvent[]) => {
        this.events = events;
      });

  }

}
