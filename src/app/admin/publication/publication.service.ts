import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Publication } from './publication.model';
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/publications/";

@Injectable({
  providedIn: 'root'
})

export class PublicationService {

  private publications: Publication[] = [];
  private publicationsUpdated = new Subject<Publication[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPublications() {
    this.http
      .get<{ message: string, publications: any }>(BACKEND_URL)
      .pipe(
        map(publicationData => {
          return publicationData.publications.map(publication => {
            return {
              id: publication._id,
              title: publication.title,
              url: publication.url,
              type: publication.type,
              imagePath: publication.imagePath
            };
          });
        })
      )
      .subscribe(transformedPublications => {
        this.publications = transformedPublications;
        this.publicationsUpdated.next([...this.publications]);

      });
  }

  getPublicationUpdateListener() {
    return this.publicationsUpdated.asObservable();
  }

  getPublication(id: string) {
    return this.http.get<{ _id: string, title: string, url: string, type: string, imagePath: string }>(
      BACKEND_URL + id
    );
  }

  addPublication(title: string, url: string, type: string, image: File) {

    const pubType = (type == "com") ? "CSI-Communication-" : "CSI-Adhyayan-";
    const publicationData = new FormData();

    publicationData.append("title", title);
    publicationData.append("url", url);
    publicationData.append("type", type);
    publicationData.append("image", image, pubType + title);

    this.http
      .post<{ message: string, publication: Publication }>(BACKEND_URL, publicationData)
      .subscribe(responseData => {
        const publication: Publication = {
          id: responseData.publication.id,
          title: responseData.publication.title,
          url: responseData.publication.url,
          type: responseData.publication.type,
          imagePath: responseData.publication.imagePath
        }
        this.publications.push(publication);
        this.publicationsUpdated.next([...this.publications]);

        this.router.navigateByUrl('/dashboard');
      });
  }

  updatePublication(id: string, title: string, url: string, type: string, image: File | string) {
    let publicationData: Publication | FormData;
    if (typeof image === "object") {
      publicationData = new FormData();
      publicationData.append("id", id);
      publicationData.append("title", title);
      publicationData.append("url", url);
      publicationData.append("type", type);
      publicationData.append("image", image, title);
    } else {
      publicationData = {
        id: id,
        title: title,
        url: url,
        type: type,
        imagePath: image
      };
    }

    this.http
      .put<{ message: string, publication: Publication }>(BACKEND_URL + id, publicationData)
      .subscribe(responseData => {

        const updatedPosts = [...this.publications];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const publication: Publication = {
          id: id,
          title: title,
          url: url,
          type: type,
          imagePath: responseData.publication.imagePath
        };
        updatedPosts[oldPostIndex] = publication;

        this.publications = updatedPosts;
        this.publicationsUpdated.next([...this.publications]);


      });
  }

  deletePublication(publicationId: string) {
    this.http
      .delete(BACKEND_URL + publicationId)
      .subscribe(() => {
        const updatedPosts = this.publications.filter(publication => publication.id !== publicationId);
        this.publications = updatedPosts;
        this.publicationsUpdated.next([...this.publications]);
      });
  }
}
