import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsComponent } from './actors.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-initiator', template: '<h1>initiator</h1>' })
class InitiatorStubComponent { }

@Component({ selector: 'app-contractor', template: '<h1>contractor</h1>' })
class ContractorStubComponent { }

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
        InitiatorStubComponent,
        AgentStubComponent,
        ContractorStubComponent,
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
