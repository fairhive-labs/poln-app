import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  types: string[];
  private readonly _types = "advisor agent client contributor investor mentor talent";

  constructor() {
    this.types = this._types.split(" ").sort((t1, t2) => t1.localeCompare(t2));
  }

  ngOnInit(): void {
  }

}

