import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl , FormGroup, Validators } from '@angular/forms';

import { mimeType } from '../../mime-type.validator';
import { EventService } from '../event.service';

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  myForm: FormGroup;
  eventTilePreview: string | ArrayBuffer;
  eventBannerPreview: string | ArrayBuffer;
  eventPhoneBannerPreview: string | ArrayBuffer;

  constructor(private eventsService: EventService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      entryFees: ['', [Validators.required]],
      registrationLink: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      prize1: ['', [Validators.required]],
      prize2: ['', [Validators.required]],
      prize3: [''],
      description: ['',[Validators.required]],
      personOne: ['', [Validators.required]],
      personOneEmail: ['', [Validators.required, Validators.email]],
      personOneContact: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      personTwo: [''],
      personTwoEmail: ['',[Validators.email]],
      personTwoContact: ['',[Validators.minLength(10),Validators.maxLength(10)]],
      eventTile: new FormControl(null, {  
        validators:[Validators.required],  
        asyncValidators: [mimeType]}),  
      eventBanner: new FormControl(null, {  
        validators:[Validators.required],  
        asyncValidators: [mimeType]}),  
      eventPhoneBanner: new FormControl(null, {  
        validators:[Validators.required],  
        asyncValidators: [mimeType]})  
    });
  }

  onTilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({ eventTile: file });
    this.myForm.get("eventTile").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.eventTilePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onBannerPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({ eventBanner: file });
    this.myForm.get("eventBanner").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.eventBannerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onPhoneBannerPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({ eventPhoneBanner: file });
    this.myForm.get("eventPhoneBanner").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.eventPhoneBannerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddEvent() {
    if (this.myForm.invalid) {
      console.log("Invalid Form");
      return;
    }

    this.eventsService.addEvent(
      this.myForm.value.title,
      this.myForm.value.start,
      this.myForm.value.end,
      this.myForm.value.entryFees,
      this.myForm.value.registrationLink,
      this.myForm.value.venue,
      this.myForm.value.prize1,
      this.myForm.value.prize2,
      this.myForm.value.prize3,
      this.myForm.value.description,
      this.myForm.value.personOne,
      this.myForm.value.personOneContact,
      this.myForm.value.personOneEmail,
      this.myForm.value.personTwo,
      this.myForm.value.personTwoContact,
      this.myForm.value.personTwoEmail,
      this.myForm.value.eventTile,
      this.myForm.value.eventBanner,
      this.myForm.value.eventPhoneBanner,
    );
    this.myForm.reset();
    document.getElementById('closeCreateEventForm').click();
    location.reload();
  }
}
