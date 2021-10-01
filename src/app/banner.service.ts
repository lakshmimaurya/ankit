import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl + "/homeBanners/";

@Injectable({
  providedIn: 'root'
})

export class BannerService {

  private banners = [];

  constructor(private http: HttpClient, private router: Router) { }

  getBanner() {
    return this.http.get<{ message: string, banners: any }>(BACKEND_URL );
  }

  updateBanner( homeBannerPath: File | string, phoneBannerPath: File | string) {
    let bannerData;
    if (typeof homeBannerPath === "object" || typeof phoneBannerPath === "object") {
      bannerData = new FormData();
      if (typeof homeBannerPath === "object") {
        bannerData.append("homeBannerImage", homeBannerPath, "CSI-MSI-Banner");
      } else {
        bannerData.append("homeBannerImage", homeBannerPath);
      }

      if (typeof phoneBannerPath === "object") {
        bannerData.append("phoneBannerImage", phoneBannerPath, "CSI-MSI-Banner2");
      } else {
        bannerData.append("phoneBannerImage", phoneBannerPath);
      }
    } else {
      bannerData = {
        "homeBannerImage": homeBannerPath,
        "phoneBannerImage": phoneBannerPath
      };
    }

    this.http
      .put<{ message: string, banner: any }>(BACKEND_URL , bannerData)
      .subscribe(responseData => {
        const banner = {
          homeBannerPath: responseData.banner.homeBannerPath,
          phoneBannerPath: responseData.banner.phoneBannerPath
        };
      });
  }

}
