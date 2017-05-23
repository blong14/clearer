import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { ComponentsModule } from './components/components.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { SignupModule } from './signup/signup.module';

import { AppComponent } from './app.component';

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
    ProjectModule,
    RouterModule.forRoot([]),
    SignupModule
  ],
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ]
})
export class AppModule { }
