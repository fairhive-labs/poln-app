import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { PreregisterService } from '../preregister.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  activationForm: FormGroup;
  submitted = false;
  progressing = false;
  submissionError = '';
  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private preregisterService: PreregisterService) {
    this.activationForm = this.fb.group({
      hash: ['', Validators.required],
    });

    let h = this.preregisterService.loadHash();
    if (h) {
      this.hash.setValue(h);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.token = params.get('token')!);
  }

  get hash() {
    return this.activationForm.get('hash') as FormControl;
  }

  get controls() {
    return this.activationForm.controls;
  }

  submit() {
    if (this.activationForm.valid) {
      this.submissionError = '';

      this.progressing = true;
      Object.keys(this.controls).forEach(c => this.controls[c].disable());

      this.preregisterService.activate(
        this.token,
        this.hash.value
      ).pipe(
        finalize(() => {
          this.progressing = false;
          Object.keys(this.controls).forEach(c => this.controls[c].enable());
        }),
        catchError(err => {
          console.error(err);
          this.submissionError = 'Oups, something goes wrong... Try again ?';
          return of({ activated: false })
        }),
      ).subscribe(r => {
        if (r.activated) {
          this.preregisterService.clearHash();
          this.submitted = true;
        }
      });
    }
  }

}
