import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaComponent } from './social-media.component';

describe('SocialMediaComponent', () => {
  let component: SocialMediaComponent;
  let fixture: ComponentFixture<SocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialMediaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain some media', () => {
    expect(component.media).toBeTruthy();
    expect(component.media.length).toBeGreaterThan(0);
  });

  it('should contain GitHub media', () => {
    expect(component.media).toBeTruthy();
    const i = component.media.findIndex(s => s.name.toLocaleLowerCase() === 'github');
    expect(i).not.toEqual(-1);
  });
});
