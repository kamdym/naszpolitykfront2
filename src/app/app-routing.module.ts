 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PoliticianComponent} from "./main/politician.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {LoginComponent} from "./login/login.component";
import {DiscussComponent} from "./discuss/discuss.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ObservedComponent} from "./observed/observed.component";
import {NotificationComponent} from "./notification/notification.component";
import {Top10Component} from "./top10/top10.component";
 import {PoliticiansListComponent} from "./politicians-list/politicians-list.component";

const routes: Routes = [
  { path: 'politician/:politicianId', component: PoliticianComponent },
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'logout', component: LoginComponent},
  { path: 'discuss/:id/:id2', component: DiscussComponent},
  { path: 'discuss/:id', component: DiscussComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'top-ten', component: Top10Component},
  { path: 'notification', component: NotificationComponent},
  { path: 'observed', component: ObservedComponent},
  { path: 'main', component:PoliticiansListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
