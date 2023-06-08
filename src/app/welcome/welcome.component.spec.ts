import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Component } from '@angular/core';

@Component({ selector: 'app-credo', template: '<h1>credo</h1>' })
class CredoStubComponent { }

@Component({ selector: 'app-actors', template: '<h1>actors</h1>' })
class ActorsStubComponent { }

@Component({ selector: 'app-values', template: '<h2>value</h2>' })
class ValuesStubComponent { }

@Component({ selector: 'app-social-media', template: '<h2>social-media</h2>' })
class SocialMediaStubComponent { }

@Component({ selector: 'app-deck-wp', template: '<h2>social-media</h2>' })
class DeckWpStubComponent { }

@Component({ selector: 'app-intro-video', template: '<h2>video</h2>' })
class IntroVideoStubComponent { }

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [
        WelcomeComponent,
        CredoStubComponent,
        ActorsStubComponent,
        ValuesStubComponent,
        SocialMediaStubComponent,
        DeckWpStubComponent,
        IntroVideoStubComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
