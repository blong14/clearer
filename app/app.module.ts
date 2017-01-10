import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DataService } from './data.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { IdeaComponent } from './idea/idea.component';

// need to finish phase'd approach to idea list
import { PhaseOneComponent } from './idea/phase-1/phase-1.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        LoginComponent,
        IdeaComponent,
        PhaseOneComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            { path: 'idea/:id', component: IdeaComponent },
            { path: '', component: DashboardComponent },
        ])
    ],
    providers: [
        AuthService,
        DataService,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule{}
