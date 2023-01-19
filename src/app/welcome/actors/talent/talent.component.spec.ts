import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentComponent } from './talent.component';

describe('TalentComponent', () => {
  let component: TalentComponent;
  let fixture: ComponentFixture<TalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [TalentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
