import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  types: string[];
  private readonly _types = "advisor agent client contributor investor mentor talent";
  preregistrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.types = this._types.split(" ").sort((t1, t2) => t1.localeCompare(t2));
    this.preregistrationForm = this.fb.group({
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get address() {
    return this.preregistrationForm.get('address') as FormControl;
  }

  get email() {
    return this.preregistrationForm.get('email') as FormControl;
  }

  get type() {
    return this.preregistrationForm.get('type') as FormControl;
  }

  submit() {
    //@TODO : use preregister service
    console.log(this.preregistrationForm.value);
  }

}

