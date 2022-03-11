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


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CredoComponent,
    ActorsComponent,
    ThemeSwitchComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
