import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publication } from 'src/app/admin/publication/publication.model';
import { PublicationService } from 'src/app/admin/publication/publication.service';
declare var $: any;

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  publications: Publication[] = [];
  private publicationsSub: Subscription;

  constructor(private publicationsService: PublicationService) { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");

    this.publicationsService.getPublications();
    this.publicationsSub = this.publicationsService.getPublicationUpdateListener()
      .subscribe((publications: Publication[]) => {
        this.publications = publications;
      });
  }

  filterPublicationsOfType(type: string){
    return this.publications.filter(x => x.type == type);
}

}
