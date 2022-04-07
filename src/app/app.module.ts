import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatCardModule } from '@angular/material/card';
import { CredoComponent } from './welcome/credo/credo.component';
import { ActorsComponent } from './welcome/actors/actors.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { ClientComponent } from './welcome/actors/client/client.component';
import { TalentComponent } from './welcome/actors/talent/talent.component';
import { AgentComponent } from './welcome/actors/agent/agent.component';
import { MentorComponent } from './welcome/actors/mentor/mentor.component';
import { ValuesComponent } from './welcome/values/values.component';
import { MatDividerModule } from '@angular/material/divider';
import { SocialMediaComponent } from './welcome/social-media/social-media.component';
import { DeckWpComponent } from './welcome/deck-wp/deck-wp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './welcome/waitlist/register/register.component';
import { ActivateComponent } from './welcome/waitlist/activate/activate.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CredoComponent,
    ActorsComponent,
    ThemeSwitchComponent,
    ClientComponent,
    TalentComponent,
    AgentComponent,
    MentorComponent,
    ValuesComponent,
    SocialMediaComponent,
    DeckWpComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ActivateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
