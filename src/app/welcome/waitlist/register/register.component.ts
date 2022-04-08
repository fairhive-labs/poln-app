import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  types: string[];
  private readonly _types = "advisor agent client contributor investor mentor talent";
  preregistrationForm: FormGroup;

  constructor() {
    this.types = this._types.split(" ").sort((t1, t2) => t1.localeCompare(t2));
    this.preregistrationForm = new FormGroup({
      address: new FormControl(''),
      email: new FormControl(''),
      type: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

}

