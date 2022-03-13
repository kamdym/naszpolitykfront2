import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RegistrationComponent} from './registration/registration.component';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {PoliticianComponent} from './main/politician.component';
import {AppRoutingModule} from './app-routing.module';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CompareValidatorDirective} from "./passwordValidator/compare-validator.directive";
import {LeftMenuResComponent} from './left-menu-res/left-menu-res.component';
import {DiscussComponent} from './discuss/discuss.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {MatButtonModule} from "@angular/material/button";
import { AboutUsComponent } from './about-us/about-us.component';
import { Top10Component } from './top10/top10.component';
import { ObservedComponent } from './observed/observed.component';
import { NotificationComponent } from './notification/notification.component';
import { PoliticiansListComponent } from './politicians-list/politicians-list.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import { UpperPanelComponent } from './upper-panel/upper-panel.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PoliticianComponent,
    UserProfileComponent,
    CompareValidatorDirective,
    LeftMenuResComponent,
    DiscussComponent,
    AboutUsComponent,
    Top10Component,
    ObservedComponent,
    NotificationComponent,
    PoliticiansListComponent,
    UpperPanelComponent
  ],
  imports: [
    MatTooltipModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      //{ path: '', component: LoginComponent },
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent},
      {path: '**', redirectTo: 'registration'}
    ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormlyModule.forRoot({
      extras: {lazyRender: true},
      validators:[
        {
          name:"passwordValidator",
          validation:passwordValidator
        }
      ]
    }),
    FormlyMaterialModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
export function passwordValidator(control:AbstractControl){

  if (!control.value)
    return null
  const{password, confirmPassword}=control.value

  if(!password || !confirmPassword || password===confirmPassword)
    return null
  return {fieldMatch:{message:"Podane hasła różnią się!"}}
}
