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

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "events", component: EventsComponent
  },
  {
    path: "publish", component: PublicationComponent
  },
  {
    path: "team", component: TeamComponent
  },
  {
    path: "student", component: StudentComponent
  },
  {
    path: "contact", component: ContactComponent
  },
  {
    path: "convention", component: ConventionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
