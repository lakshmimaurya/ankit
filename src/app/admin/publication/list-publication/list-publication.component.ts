import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mimeType } from '../../mime-type.validator';

import { Publication } from '../publication.model';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'list-publication',
  templateUrl: './list-publication.component.html',
  styleUrls: ['./list-publication.component.css']
})
export class ListPublicationComponent implements OnInit, OnDestroy {


  publicationId: string = '';
  publicationTitle: string = '';
  publications: Publication[] = [];
  publication: Publication;
  private publicationsSub: Subscription;
  myEditForm: FormGroup;
  imagePreview: string | ArrayBuffer;

  constructor(private publicationsService: PublicationService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.myEditForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      type: ['', [Validators.required]],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.publicationsService.getPublications();
    this.publicationsSub = this.publicationsService.getPublicationUpdateListener()
      .subscribe((publications: Publication[]) => {
        this.publications = publications;
      });
  }

  filterPublicationsOfType() {
    return this.publications.filter(x => x.type == "com");
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myEditForm.patchValue({ image: file });
    this.myEditForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onDelete(publicationId: string, publicationTitle: string) {
    this.publicationId = publicationId;
    this.publicationTitle = publicationTitle;
  }

  onDeletePublication() {
    this.publicationsService.deletePublication(this.publicationId);
    document.getElementById('closeDeletePubModal').click();
    this.publicationId = null;
    this.publicationTitle = null;
  }

  onEditPublication(pub: Publication) {
    this.publication = pub;
    this.publicationId = pub.id;
    this.imagePreview = pub.imagePath;
    this.myEditForm.setValue({ title: pub.title, url: pub.url, type: pub.type, image: pub.imagePath });
  }

  onSavePublication() {
    if (this.myEditForm.invalid) {
      console.log("Invalid Form");
      return;
    }
    this.publicationsService.updatePublication(this.publicationId, this.myEditForm.value.title, this.myEditForm.value.url, this.myEditForm.value.type, this.myEditForm.value.image);
    this.myEditForm.reset();
    document.getElementById('closeEditPubForm').click();
  }

  ngOnDestroy() {
    this.publicationsSub.unsubscribe();
  }
}