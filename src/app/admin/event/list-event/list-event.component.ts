import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService } from '../event.service';
import { myEvent } from '../event.model';
import { mimeType } from '../../mime-type.validator';

@Component({
  selector: 'list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit, OnDestroy {

  eventId: string = '';
  eventTitle: string = '';
  events: myEvent[] = [];
  event: myEvent = {
    id: "",
    title: "",
    start: new Date("August 19, 1975 23:15:30 GMT+11:00"),
    end: new Date("August 19, 1975 23:15:30 GMT+11:00"),
    entryFees: "",
    registrationLink: "",
    venue: "",
    prize1: "",
    prize2: "",
    prize3: "",
    description: "",
    personOne: "",
    personOneEmail: "",
    personOneContact: "",
    personTwo: "",
    personTwoEmail: "",
    personTwoContact: "",
    tileImagePath: "",
    bannerImagePath: "",
    phoneBannerImagePath: "",
  };
  private eventsSub: Subscription;
  myEventEditForm: FormGroup;
  eventTilePreview: string | ArrayBuffer;
  eventBannerPreview: string | ArrayBuffer;
  eventPhoneBannerPreview: string | ArrayBuffer;

  constructor(private eventsService: EventService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myEventEditForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      entryFees: ['', [Validators.required]],
      registrationLink: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      prize1: ['', [Validators.required]],
      prize2: ['', [Validators.required]],
      prize3: [''],
      description: ['', [Validators.required]],
      personOne: ['', [Validators.required]],
      personOneEmail: ['', [Validators.required, Validators.email]],
      personOneContact: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      personTwo: [''],
      personTwoEmail: ['', [Validators.email]],
      personTwoContact: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      eventTile: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      eventBanner: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      eventPhoneBanner: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.eventsService.getEvents();
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((events: myEvent[]) => {
        this.events = events;
      });
  }


  onViewEvent(eventId: string) {
    this.eventsService.getEvent(eventId).subscribe(eventData => {
      this.event.title = eventData.title;
      this.event.start = eventData.start;
      this.event.end = eventData.end;
      this.event.entryFees = eventData.entryFees;
      this.event.registrationLink = eventData.registrationLink;
      this.event.venue = eventData.venue;
      this.event.description = eventData.description;
      this.event.personOne = eventData.personOne;
      this.event.personOneContact = eventData.personOneContact;
      this.event.personOneEmail = eventData.personOneEmail;
      this.event.personTwo = eventData.personTwo;
      this.event.personTwoContact = eventData.personOneEmail;
      this.event.personTwoEmail = eventData.personTwoEmail;
      this.event.bannerImagePath = eventData.bannerImagePath;
      this.event.phoneBannerImagePath = eventData.phoneBannerImagePath;
      this.event.prize1 = eventData.prize1;
      this.event.prize2 = eventData.prize2;
      this.event.prize3 = eventData.prize3;
    });
  }





  onTilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myEventEditForm.patchValue({ eventTile: file });
    this.myEventEditForm.get("eventTile").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.eventTilePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onBannerPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myEventEditForm.patchValue({ eventBanner: file });
    this.myEventEditForm.get("eventBanner").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.eventBannerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onPhoneBannerPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myEventEditForm.patchValue({ eventPhoneBanner: file });
    this.myEventEditForm.get("eventPhoneBanner").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.eventPhoneBannerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onEditEvent(eventId: string) {
    this.eventId = eventId;
    this.eventsService.getEvent(this.eventId).subscribe(eventData => {
      this.eventId = eventData._id;
      this.eventTilePreview = eventData.tileImagePath;
      this.eventBannerPreview = eventData.bannerImagePath;
      this.eventPhoneBannerPreview = eventData.phoneBannerImagePath;

      this.myEventEditForm.setValue({
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        entryFees: eventData.entryFees,
        registrationLink: eventData.registrationLink,
        venue: eventData.venue,
        prize1: eventData.prize1,
        prize2: eventData.prize2,
        prize3: eventData.prize3,
        description: eventData.description,
        personOne: eventData.personOne,
        personOneEmail: eventData.personOneEmail,
        personOneContact: eventData.personOneContact,
        personTwo: eventData.personTwo,
        personTwoEmail: eventData.personTwoEmail,
        personTwoContact: eventData.personTwoContact,
        eventTile: eventData.tileImagePath,
        eventBanner: eventData.bannerImagePath,
        eventPhoneBanner: eventData.phoneBannerImagePath
      });
    });
  }

  onSaveEvent() {
    if (this.myEventEditForm.invalid) {
      console.log("Invalid Form");
      return;
    }

    this.eventsService.updateEvent(
      this.eventId,
      this.myEventEditForm.value.title,
      this.myEventEditForm.value.start,
      this.myEventEditForm.value.end,
      this.myEventEditForm.value.entryFees,
      this.myEventEditForm.value.registrationLink,
      this.myEventEditForm.value.venue,
      this.myEventEditForm.value.prize1,
      this.myEventEditForm.value.prize2,
      this.myEventEditForm.value.prize3,
      this.myEventEditForm.value.description,
      this.myEventEditForm.value.personOne,
      this.myEventEditForm.value.personOneContact,
      this.myEventEditForm.value.personOneEmail,
      this.myEventEditForm.value.personTwo,
      this.myEventEditForm.value.personTwoContact,
      this.myEventEditForm.value.personTwoEmail,
      this.myEventEditForm.value.eventTile,
      this.myEventEditForm.value.eventBanner,
      this.myEventEditForm.value.eventPhoneBanner
    );
    this.myEventEditForm.reset();
    document.getElementById('closeEditEventForm').click();
    location.reload();
  }

  onDelete(eventId: string, eventTitle: string) {
    this.eventId = eventId;
    this.eventTitle = eventTitle;
  }

  onDeleteEvent() {
    this.eventsService.deleteEvent(this.eventId);
    document.getElementById('closeDeleteEventModal').click();
    this.eventId = null;
    this.eventTitle = null;
    location.reload();
  }



  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}