import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';

@Component({ selector: 'app-credo', template: '<h1>credo</h1>' })
class CredoStubComponent {
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [WelcomeComponent, CredoStubComponent]
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

  it('should contain a message', () => {
    expect(component.message).toBeTruthy();
    expect(component.message).toBe('Decentralized protocol for blockchain recruitment and trusted projects')
  });
});
