import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesComponent } from './values.component';

describe('ValuesComponent', () => {
  let component: ValuesComponent;
  let fixture: ComponentFixture<ValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
