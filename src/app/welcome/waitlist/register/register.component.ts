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
  defaultSponsor = '0xE3C3691DB5f5185F37A3f98e5ec76403B2d10c3E';

  preregistrationForm = this.fb.group({
    address: ['', [Validators.required, CustomValidators.ethAddress]],
    email: ['', [Validators.required, Validators.email]],
    type: ['', [Validators.required, CustomValidators.supportedUserType]],
    sponsor: [this.defaultSponsor, [Validators.required, CustomValidators.ethAddress]],
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

  get sponsor() {
    return this.preregistrationForm.get('sponsor')!;
  }

  submit() {
    if (this.preregistrationForm.valid) {
      this.submissionError = '';

      this.progressing = true;
      this.address.disable();
      this.email.disable();
      this.type.disable();
      this.sponsor.disable();

      this.preregisterService.register(
        this.address.value,
        this.email.value,
        this.type.value,
        this.sponsor.value,
      ).pipe(
        finalize(() => {
          this.progressing = false;
          this.address.enable();
          this.email.enable();
          this.type.enable();
          this.sponsor.enable();
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

  private static readonly _types = "advisor agent client contributor investor mentor contractor";
  static types = CustomValidators._types.split(" ").sort((t1, t2) => t1.localeCompare(t2));
  static ethRegExp = /^0x[a-fA-F0-9]{40}$/;

  static supportedUserType(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.types.includes(control.value) ? null : { incorrectUserType: { value: control.value } }
  }

  static ethAddress(control: AbstractControl): ValidationErrors | null {
    return CustomValidators.ethRegExp.test(control.value) ? null : { invalidEthAddress: { value: control.value } }
  }
}
