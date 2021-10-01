import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ConventionComponent } from './pages/convention/convention.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { StudentComponent } from './pages/student/student.component';
import { TeamComponent } from './pages/team/team.component';
import { combineLatest } from 'rxjs';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './auth/adminlogin/adminlogin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "events", component: EventsComponent },
  { path: "publish", component: PublicationComponent },
  { path: "team", component: TeamComponent },
  { path: "student", component: StudentComponent },
  { path: "contact", component: ContactComponent },
  { path: "convention", component: ConventionComponent },
  { path: "admin", component: AdminloginComponent },
  { path: "create", component: SignupComponent },
  { path: "dashboard", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
