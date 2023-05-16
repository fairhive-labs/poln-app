import { ActivateResponse } from './../preregister.service';
import { Component, OnInit } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { PreregisterService } from '../preregister.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  submitted = false;
  progressing = false;
  submissionError = '';
  token: string;

  activationForm = this.fb.group({
    hash: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private preregisterService: PreregisterService) {
    let h = this.preregisterService.loadHash();
    if (h) {
      this.hash.setValue(h);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.token = params.get('token')!);
  }

  get hash() {
    return this.activationForm.get('hash')!;
  }


  submit() {
    if (this.activationForm.valid) {
      this.submissionError = '';

      this.progressing = true;
      this.hash.disable();

      this.preregisterService.activate(
        this.token,
        this.hash.value
      ).pipe(
        finalize(() => {
          this.progressing = false;
          this.hash.enable();
        }),
        catchError(err => {
          console.error(err);
          this.submissionError = 'Oups, something goes wrong... Try again ?';
          return of({} as ActivateResponse)
        }),
      ).subscribe(r => {
        if (r.uuid) {
          this.preregisterService.clearHash();
          this.submitted = true;
          //@TODO: use it for on-chain transaction
          console.log(r);
        }
      });
    }
  }

}
