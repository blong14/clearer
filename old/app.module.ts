// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// services
import { AuthService } from './auth.service';

import { SharedModule } from './shared/shared.module';

// feature modules
import { CreateModule } from './create/create.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { IdeaModule } from './idea/idea.module';
import { ProjectModule } from './project/project.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginBoxComponent } from './login/login-box/login-box.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ProjectBriefComponent } from './components/project-brief/project-brief.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';

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
        LoginBoxComponent,
        TeamListComponent,
        ProjectListComponent,
        ActivityListComponent,
        ProgressBarComponent,
        IdeaListComponent,
        QuestionsListComponent,
        CommentListComponent,
        ProjectBriefComponent,
        HeaderComponent,
        FooterComponent,
        CardComponent
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
        IdeaModule,
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
