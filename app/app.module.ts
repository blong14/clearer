// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// services
import { AuthService } from './auth.service';

import { SharedModule } from './shared/shared.module';

// feature modules
import { CreateModule } from './create/create.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectModule } from './project/project.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

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
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        SharedModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        CreateModule,
        DashboardModule,
        ProjectModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
        ])
    ],
    exports: [ 
    ],
    providers: [ AuthService ],
    bootstrap: [ AppComponent ]
})

export class AppModule{}
