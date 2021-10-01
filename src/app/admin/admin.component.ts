import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BannerService } from '../banner.service';
import { mimeType } from './mime-type.validator';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  banners = {
    homeBannerPath: '',
    phoneBannerPath: ''
  };

  homeBannerPhonePreview: string | ArrayBuffer;
  homeBannerPreview: string | ArrayBuffer;
  myBannerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private banner: BannerService) { }

  ngOnInit(): void {
    $('#main-menu').removeClass("show");
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.myBannerForm = this.formBuilder.group({
      homeBanner: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      phoneBanner: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.banner.getBanner().subscribe(bannerData => {
      this.banners.homeBannerPath = bannerData.banners.homeBannerPath;
      this.banners.phoneBannerPath = bannerData.banners.phoneBannerPath;

      this.myBannerForm.setValue({
        homeBanner: bannerData.banners.homeBannerPath,
        phoneBanner: bannerData.banners.phoneBannerPath,

      });
    });


  }

  onHomeBannerPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myBannerForm.patchValue({ homeBanner: file });
    this.myBannerForm.get("homeBanner").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.homeBannerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onPhoneBannerPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myBannerForm.patchValue({ phoneBanner: file });
    this.myBannerForm.get("phoneBanner").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.homeBannerPhonePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveBanner() {
    this.banner.updateBanner(this.myBannerForm.value.homeBanner, this.myBannerForm.value.phoneBanner);
    this.myBannerForm.reset();
    location.reload();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }


}
