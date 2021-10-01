import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { mimeType } from '../../mime-type.validator';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent implements OnInit {

  myForm: FormGroup;
  imagePreview: string | ArrayBuffer;

  constructor(private publicationService: PublicationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      type: ['', [Validators.required]],
      image: new FormControl(null, {  
        validators:[Validators.required],  
        asyncValidators: [mimeType]})  
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({ image: file });
    this.myForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAddPublication() {
    if (this.myForm.invalid) {
      console.log("Invalid Form");
      return;
    }
    this.publicationService.addPublication(this.myForm.value.title, this.myForm.value.url, this.myForm.value.type, this.myForm.value.image);
    this.myForm.reset();
    document.getElementById('closeCreatePubForm').click();
  }
}
