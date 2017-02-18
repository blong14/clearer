// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// services
import { AuthService } from './auth.service';

// feature modules
import { DashboardModule } from './dashboard/dashboard.module';
import { IdeaModule } from './idea/idea.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

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
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        DashboardModule,
        IdeaModule,
        HeaderModule,
        FooterModule,
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
