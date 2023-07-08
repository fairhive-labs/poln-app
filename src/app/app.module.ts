import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { CredoComponent } from './welcome/credo/credo.component';
import { ActorsComponent } from './welcome/actors/actors.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { TalentComponent } from './welcome/actors/talent/talent.component';
import { AgentComponent } from './welcome/actors/agent/agent.component';
import { MentorComponent } from './welcome/actors/mentor/mentor.component';
import { ValuesComponent } from './welcome/values/values.component';
import { SocialMediaComponent } from './welcome/social-media/social-media.component';
import { DeckWpComponent } from './welcome/deck-wp/deck-wp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './welcome/waitlist/register/register.component';
import { ActivateComponent } from './welcome/waitlist/activate/activate.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroVideoComponent } from './welcome/intro-video/intro-video.component';
import { InitiatorComponent } from './welcome/actors/initiator/initiator.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CredoComponent,
    ActorsComponent,
    ThemeSwitchComponent,
    InitiatorComponent,
    TalentComponent,
    AgentComponent,
    MentorComponent,
    ValuesComponent,
    SocialMediaComponent,
    DeckWpComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ActivateComponent,
    IntroVideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
