import { catchError, finalize, of } from 'rxjs';
import { PreregisterService } from './../preregister.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  types: string[];
  preregistrationForm: UntypedFormGroup;
  submitted = false;
  progressing = false;
  submissionError = '';

  constructor(private fb: UntypedFormBuilder, private preregisterService: PreregisterService) {
    this.types = CustomValidators.types;
    this.preregistrationForm = this.fb.group({
      address: ['', [Validators.required, CustomValidators.ethAddress]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required, CustomValidators.supportedUserType]],
    });
  }

  ngOnInit(): void {
  }

  get address() {
    return this.preregistrationForm.get('address') as UntypedFormControl;
  }

  get email() {
    return this.preregistrationForm.get('email') as UntypedFormControl;
  }

  get type() {
    return this.preregistrationForm.get('type') as UntypedFormControl;
  }

  get controls() {
    return this.preregistrationForm.controls;
  }

  submit() {
    if (this.preregistrationForm.valid) {
      this.submissionError = '';

      this.progressing = true;
      Object.keys(this.controls).forEach(c => this.controls[c].disable());

      this.preregisterService.register(
        this.address.value,
        this.email.value,
        this.type.value
      ).pipe(
        finalize(() => {
          this.progressing = false;
          Object.keys(this.controls).forEach(c => this.controls[c].enable());
        }),
        catchError(err => {
          console.error(err);
          this.submissionError = 'Oups, something goes wrong...';
          return of({ hash: null })
        }),
      ).subscribe(r => {
        if (r.hash) {
          this.preregisterService.saveHash(r.hash);
          this.submitted = true;
        }
      });
    }
  }

}

class CustomValidators {
  private static readonly _types = "advisor agent client contributor investor mentor talent";
  static types = CustomValidators._types.split(" ").sort((t1, t2) => t1.localeCompare(t2));
  static ethRegExp = /^0x[a-fA-F0-9]{40}$/;

  static supportedUserType(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.types.includes(control.value) ? null : { incorrectUserType: { value: control.value } }
  }

  static ethAddress(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.ethRegExp.test(control.value) ? null : { invalidEthAddress: { value: control.value } }
  }
}
