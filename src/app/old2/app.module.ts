// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// feature modules
import { DashboardModule } from './containers/dashboard/dashboard.module';
import { LoginModule } from './containers/login/login.module';
import { ProjectModule } from './containers/project/project.module';
import { SignupModule } from './containers/signup/signup.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { AuthGuardService } from './auth-guard.service';
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
    declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent
    ],
    imports: [
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        BrowserModule,
        DashboardModule,
        FormsModule,
        HttpModule,
        LoginModule,
        ProjectModule,
        RouterModule.forRoot([ ]),
        SignupModule
    ],
    exports: [
    ],
    bootstrap: [ AppComponent ],
    providers: [
      AuthGuardService,
      AuthService
    ]
})

export class AppModule{}
