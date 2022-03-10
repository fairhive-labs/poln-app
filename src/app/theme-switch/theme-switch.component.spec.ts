import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { finalize, take, tap } from 'rxjs';

import { ThemeSwitchComponent, ThemeMode } from './theme-switch.component';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;
  const Nswitchs = [2, 10, 25, 50];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ThemeSwitchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have default mode ${ThemeMode.Dark}`, () => {
    expect(component.mode).toBeTruthy();
    expect(component.mode).toEqual(ThemeMode.Dark);
  });

  it('should have a defined EventEmitter', () => {
    expect(component.modeChange).toBeTruthy();
  });

  [ThemeMode.Dark, ThemeMode.Light].forEach(t => {
    it(`should convert ${t}`, () => {
      const ct = component.convert(t);
      switch (t) {
        case ThemeMode.Dark: {
          expect(ct).toEqual(ThemeMode.Light);
          break;
        }
        case ThemeMode.Light: {
          expect(ct).toEqual(ThemeMode.Dark);
          break;
        }
        default:
          throw new TypeError(`Unsupported switch mode : ${t}`);
      }
    });
  });

  Nswitchs.forEach(n => {
    it(`should switch ${n} times`, (done: DoneFn) => {
      let count = 0;
      const mode = component.mode;

      component.modeChange.pipe(
        take(n),
        finalize(done)
      ).subscribe(m => {
        count++;
        expect(m).toEqual(component.mode);

        if (count % 2) {
          expect(m).toEqual(component.convert(mode));
        } else {
          expect(m).toEqual(mode);
        }
      });

      for (let i = 0; i < n; i++) {
        component.switchMode();
      }
    });
  });


});
