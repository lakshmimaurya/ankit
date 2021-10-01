import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { EventsComponent } from './pages/events/events.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { TeamComponent } from './pages/team/team.component';
import { StudentComponent } from './pages/student/student.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ConventionComponent } from './pages/convention/convention.component';
import { AdminloginComponent } from './auth/adminlogin/adminlogin.component';
import { AdminComponent } from './admin/admin.component';
import { CreateEventComponent } from './admin/event/create-event/create-event.component';
import { ListEventComponent } from './admin/event/list-event/list-event.component';
import { CreatePublicationComponent } from './admin/publication/create-publication/create-publication.component';
import { HomeBannerComponent } from './admin/home-banner/home-banner.component';
import { ListPublicationComponent } from './admin/publication/list-publication/list-publication.component';
import {  HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    EventsComponent,
    PublicationComponent,
    TeamComponent,
    StudentComponent,
    ContactComponent,
    ConventionComponent,
    AdminloginComponent,
    AdminComponent,
    CreateEventComponent,
    ListEventComponent,
    CreatePublicationComponent,
    HomeBannerComponent,
    ListPublicationComponent,
    SignupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
