import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroVideoComponent } from './intro-video.component';

describe('IntroVideoComponent', () => {
  let component: IntroVideoComponent;
  let fixture: ComponentFixture<IntroVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
