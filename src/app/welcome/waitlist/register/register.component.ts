import { catchError, finalize, of } from 'rxjs';
import { PreregisterService } from './../preregister.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  types: string[];
  submitted = false;
  progressing = false;
  submissionError = '';

  preregistrationForm = this.fb.group({
    address: ['', [Validators.required, CustomValidators.ethAddress]],
    email: ['', [Validators.required, Validators.email]],
    type: ['', [Validators.required, CustomValidators.supportedUserType]],
  });

  constructor(private fb: NonNullableFormBuilder,
    private preregisterService: PreregisterService) {
    this.types = CustomValidators.types;
  }

  ngOnInit(): void {
  }

  get address() {
    return this.preregistrationForm.get('address')!;
  }

  get email() {
    return this.preregistrationForm.get('email')!;
  }

  get type() {
    return this.preregistrationForm.get('type')!;
  }


  submit() {
    if (this.preregistrationForm.valid) {
      this.submissionError = '';

      this.progressing = true;
      this.address.disable();
      this.email.disable();
      this.type.disable();

      this.preregisterService.register(
        this.address.value,
        this.email.value,
        this.type.value
      ).pipe(
        finalize(() => {
          this.progressing = false;
          this.address.enable();
          this.email.enable();
          this.type.enable();
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
