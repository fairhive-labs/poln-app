import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.sass']
})
export class ThemeSwitchComponent implements OnInit {

  @Input() mode: ThemeMode = ThemeMode.Dark;
  @Output() modeChange = new EventEmitter<ThemeMode>();

  constructor() {
  }

  ngOnInit(): void {
  }

  switchMode() {
    this.mode = this.convert(this.mode);
    this.modeChange.emit(this.mode);
  }

  convert(mode: ThemeMode) {
    return mode === ThemeMode.Light ? ThemeMode.Dark :  ThemeMode.Light;
  }
}

export enum ThemeMode {
  Light = 'light_mode',
  Dark = 'dark_mode'
}
