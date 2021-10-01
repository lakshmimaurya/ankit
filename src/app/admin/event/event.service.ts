import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { myEvent } from './event.model';
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/events/";

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private events: myEvent[] = [];
  private eventsUpdated = new Subject<myEvent[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getEvents() {
    this.http
      .get<{ message: string, events: any }>(BACKEND_URL)
      .pipe(map(eventData => {
        return eventData.events.map(event => {
          return {
            id: event._id,
            title: event.title,
            start: event.start,
            end: event.end,
            entryFees: event.entryFees,
            registrationLink: event.registrationLink,
            venue: event.venue,
            prize1: event.prize1,
            prize2: event.prize2,
            prize3: event.prize3,
            description: event.description,
            personOne: event.personOne,
            personOneContact: event.personOneContact,
            personOneEmail: event.personOneEmail,
            personTwo: event.personTwo,
            personTwoContact: event.personTwoContact,
            personTwoEmail: event.personTwoEmail,
            tileImagePath: event.tileImagePath,
            bannerImagePath: event.bannerImagePath,
            phoneBannerImagePath: event.phoneBannerImagePath
          };
        });
      }))
      .subscribe(transformedEvents => {
        this.events = transformedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEvent(id: string) {
    return this.http.get<{ _id: string, title: string, start: Date, end: Date, entryFees: string, registrationLink: string, venue: string, prize1: string, prize2: string, prize3: string, description: string, personOne: string, personOneEmail: string, personOneContact: string, personTwo: string, personTwoEmail: string, personTwoContact: string, tileImagePath: string, bannerImagePath: string, phoneBannerImagePath: string }>(
      BACKEND_URL + id
    );
  }

  addEvent(title: string, start: Date, end: Date, entryFees: string, registrationLink: string, venue: string, prize1: string, prize2: string, prize3: string, description: string, personOne: string, personOneContact: string, personOneEmail: string, personTwo: string, personTwoContact: string, personTwoEmail: string, tileImage: File, bannerImage: File, phoneBannerImage: File) {
    const eventData = new FormData();
    eventData.append("title", title);
    eventData.append("start", start.toString());
    eventData.append("end", end.toString());
    eventData.append("entryFees", entryFees);
    eventData.append("registrationLink", registrationLink);
    eventData.append("venue", venue);
    eventData.append("prize1", prize1);
    eventData.append("prize2", prize2);
    eventData.append("prize3", prize3);
    eventData.append("description", description);
    eventData.append("personOne", personOne);
    eventData.append("personOneContact", personOneContact);
    eventData.append("personOneEmail", personOneEmail);
    eventData.append("personTwo", personTwo);
    eventData.append("personTwoContact", personTwoContact);
    eventData.append("personTwoEmail", personTwoEmail);
    eventData.append("tileImage", tileImage, title + "-Tile");
    eventData.append("bannerImage", bannerImage, title + "-Banner");
    eventData.append("phoneBannerImage", phoneBannerImage, title + "-Phone Banner");

    this.http
      .post<{ message: string, event: myEvent }>(BACKEND_URL, eventData)
      .subscribe(responseData => {
        const event: myEvent = {
          id: responseData.event.id,
          title: responseData.event.title,
          start: responseData.event.start,
          end: responseData.event.end,
          entryFees: responseData.event.entryFees,
          registrationLink: responseData.event.registrationLink,
          venue: responseData.event.venue,
          prize1: responseData.event.prize1,
          prize2: responseData.event.prize2,
          prize3: responseData.event.prize3,
          description: responseData.event.description,
          personOne: responseData.event.personOne,
          personOneContact: responseData.event.personOneContact,
          personOneEmail: responseData.event.personOneEmail,
          personTwo: responseData.event.personTwo,
          personTwoContact: responseData.event.personTwoContact,
          personTwoEmail: responseData.event.personTwoEmail,
          tileImagePath: responseData.event.tileImagePath,
          bannerImagePath: responseData.event.bannerImagePath,
          phoneBannerImagePath: responseData.event.phoneBannerImagePath
        };

        this.events.push(event);
        this.eventsUpdated.next([...this.events]);
      });
  }

  updateEvent(id: string, title: string, start: Date, end: Date, entryFees: string, registrationLink: string, venue: string, prize1: string, prize2: string, prize3: string, description: string, personOne: string, personOneEmail: string, personOneContact: string, personTwo: string, personTwoEmail: string, personTwoContact: string, tileImage: File | string, bannerImage: File | string, phoneBannerImage: File | string) {
    let eventData: myEvent | FormData;
    if (typeof tileImage === "object" || typeof bannerImage === "object" || typeof phoneBannerImage === "object") {
      eventData = new FormData();
      eventData.append("id", id);
      eventData.append("title", title);
      eventData.append("start", start.toString());
      eventData.append("end", end.toString());
      eventData.append("entryFees", entryFees);
      eventData.append("registrationLink", registrationLink);
      eventData.append("venue", venue);
      eventData.append("prize1", prize1);
      eventData.append("prize2", prize2);
      eventData.append("prize3", prize3);
      eventData.append("description", description);
      eventData.append("personOne", personOne);
      eventData.append("personOneContact", personOneContact);
      eventData.append("personOneEmail", personOneEmail);
      eventData.append("personTwo", personTwo);
      eventData.append("personTwoContact", personTwoContact);
      eventData.append("personTwoEmail", personTwoEmail);
      if (typeof tileImage === "object") { 
        eventData.append("tileImage", tileImage, title + "-Tile"); } else {
          eventData.append("tileImage", tileImage);
      }
      
      if (typeof bannerImage === "object") { 
         eventData.append("bannerImage", bannerImage, title + "-Banner");} else{
          eventData.append("bannerImage", bannerImage);
         }
      if(typeof phoneBannerImage === "object"){
      eventData.append("phoneBannerImage", phoneBannerImage, title + "-Phone Banner");}else{
        eventData.append("phoneBannerImage", phoneBannerImage);
      }
    } else {
      eventData = {
        id: id,
        title: title,
        start: start,
        end: end,
        entryFees: entryFees,
        registrationLink: registrationLink,
        venue: venue,
        prize1: prize1,
        prize2: prize2,
        prize3: prize3,
        description: description,
        personOne: personOne,
        personOneContact: personOneContact,
        personOneEmail: personOneEmail,
        personTwo: personTwo,
        personTwoContact: personTwoContact,
        personTwoEmail: personTwoEmail,
        tileImagePath: tileImage,
        bannerImagePath: bannerImage,
        phoneBannerImagePath: phoneBannerImage
      }
    }

    this.http
      .put<{ message: string, event: myEvent }>(BACKEND_URL + id, eventData)
      .subscribe(responseData => {
        const updatedEvents = [...this.events];
        const oldEventIndex = updatedEvents.findIndex(p => p.id === id);
        const event: myEvent = {
          id: responseData.event.id,
          title: responseData.event.title,
          start: responseData.event.start,
          end: responseData.event.end,
          entryFees: responseData.event.entryFees,
          registrationLink: responseData.event.registrationLink,
          venue: responseData.event.venue,
          prize1: responseData.event.prize1,
          prize2: responseData.event.prize2,
          prize3: responseData.event.prize3,
          description: responseData.event.description,
          personOne: responseData.event.personOne,
          personOneContact: responseData.event.personOneContact,
          personOneEmail: responseData.event.personOneEmail,
          personTwo: responseData.event.personTwo,
          personTwoContact: responseData.event.personTwoContact,
          personTwoEmail: responseData.event.personTwoEmail,
          tileImagePath: responseData.event.tileImagePath,
          bannerImagePath: responseData.event.bannerImagePath,
          phoneBannerImagePath: responseData.event.phoneBannerImagePath
        }

        updatedEvents[oldEventIndex] = event;
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  deleteEvent(eventId: string) {
    this.http
      .delete(BACKEND_URL + eventId)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== eventId);
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }
}