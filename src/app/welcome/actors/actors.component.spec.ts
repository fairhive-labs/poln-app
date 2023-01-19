import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsComponent } from './actors.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-client', template: '<h1>client</h1>' })
class ClientStubComponent { }

@Component({ selector: 'app-talent', template: '<h1>talent</h1>' })
class TalentStubComponent { }

@Component({ selector: 'app-agent', template: '<h1>agent</h1>' })
class AgentStubComponent { }

@Component({ selector: 'app-mentor', template: '<h1>mentor</h1>' })
class MentorStubComponent { }

describe('ActorsComponent', () => {
  let component: ActorsComponent;
  let fixture: ComponentFixture<ActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [
        ActorsComponent,
        ClientStubComponent,
        AgentStubComponent,
        TalentStubComponent,
        MentorStubComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
