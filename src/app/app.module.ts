import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { CredoComponent } from './welcome/credo/credo.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { SocialMediaComponent } from './welcome/social-media/social-media.component';
import { DeckWpComponent } from './welcome/deck-wp/deck-wp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './welcome/waitlist/register/register.component';
import { ActivateComponent } from './welcome/waitlist/activate/activate.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroVideoComponent } from './welcome/intro-video/intro-video.component';

@NgModule({ declarations: [
        AppComponent,
        WelcomeComponent,
        CredoComponent,
        ThemeSwitchComponent,
        SocialMediaComponent,
        DeckWpComponent,
        PageNotFoundComponent,
        RegisterComponent,
        ActivateComponent,
        IntroVideoComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
