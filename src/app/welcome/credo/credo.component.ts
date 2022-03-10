import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credo',
  templateUrl: './credo.component.html',
  styleUrls: ['./credo.component.scss']
})
export class CredoComponent implements OnInit {
  title = environment.title;
  constructor() { }

  ngOnInit(): void {
  }

}
