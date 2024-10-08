import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent, THEME_MODE } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input } from '@angular/core';
import { ThemeMode } from './theme-switch/theme-switch.component';
import { AppRoutingModule } from './app-routing.module';

@Component({ selector: 'app-theme-switch', template: '<h3>switch theme</h3>' })
class ThemeSwitchStubComponent {
  @Input() mode: ThemeMode;
}

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  afterEach(() => localStorage.clear());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
      ],
      declarations: [
        AppComponent,
        ThemeSwitchStubComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should use ${ThemeMode.Dark} as default mode`, () => {
    expect(component.mode).toEqual(ThemeMode.Dark);
    expect(component.mode).toEqual(localStorage.getItem(THEME_MODE) as ThemeMode);
  });

  it('should enable dark mode', () => {
    component.enableMode(ThemeMode.Dark);
    expect(component.mode).toEqual(ThemeMode.Dark);
    expect(localStorage.getItem(THEME_MODE) as ThemeMode).toEqual(ThemeMode.Dark);
    expect(document.documentElement.classList.contains('dark-theme')).toBeTrue();
  });

  it('should enable light mode', () => {
    component.enableMode(ThemeMode.Light);
    expect(component.mode).toEqual(ThemeMode.Light);
    expect(localStorage.getItem(THEME_MODE) as ThemeMode).toEqual(ThemeMode.Light);
    expect(document.documentElement.classList.contains('dark-theme')).toBeFalse();
  });

});
