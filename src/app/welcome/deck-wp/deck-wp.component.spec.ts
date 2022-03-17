import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckWpComponent } from './deck-wp.component';

describe('DeckWpComponent', () => {
  let component: DeckWpComponent;
  let fixture: ComponentFixture<DeckWpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckWpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckWpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
