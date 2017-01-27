// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
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
