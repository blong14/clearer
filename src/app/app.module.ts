import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Response } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { ComponentsModule } from './components/components.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SignupModule } from './signup/signup.module';
import { TeamModule } from './team/team.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth.service';

export const firebaseConfig = {
    apiKey: "AIzaSyBR83ITEPOl_AfBm6LNrJdnOzV8In4EA4k",
    authDomain: "project-zebra.firebaseapp.com",
    databaseURL: "https://project-zebra.firebaseio.com",
    storageBucket: "firebase-project-zebra.appspot.com",
    messagingSenderId: "1086262072363"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    BrowserModule,
    ComponentsModule,
    DashboardModule,
    HttpModule,
    LoginModule,
    ProfileModule,
    ProjectModule,
    RouterModule.forRoot([]),
    SignupModule,
    TeamModule
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [AuthService]
})
export class AppModule { }
