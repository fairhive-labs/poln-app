import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PreregisterService } from '../preregister.service';

import { ActivateComponent } from './activate.component';

describe('ActivateComponent', () => {
  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;
  let preregisterService: jasmine.SpyObj<PreregisterService>;
  beforeEach(async () => {
    preregisterService = jasmine.createSpyObj('PreregisterService', ['activate']);
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatProgressBarModule,
      ],
      declarations: [ActivateComponent],
      providers: [{ provide: PreregisterService, useValue: preregisterService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 1 formcontrol in form group', () => {
    expect(Object.keys(component.controls)).toHaveSize(1);
  });

  it('should call submit()', fakeAsync(() => {
    const activateResponse = {
      token: 't0k3N',
      activated: true
    }
    preregisterService.activate.and.returnValue(of(activateResponse));

    component.hash.setValue('h4SH');
    expect(component.activationForm.valid).toBeTrue();
    component.submit();

    tick();
    fixture.detectChanges();

    expect(component.progressing).toBeFalse();
    expect(component.submitted).toBeTrue();
    expect(component.submissionError).toBeFalsy();
    expect(component.hash.enabled).toBeTrue();
  }));

  it('should call submit() and display an error', fakeAsync(() => {
    preregisterService.activate.and.returnValue(throwError(() => new Error('something goes wrong')));

    component.hash.setValue('h4SH');
    expect(component.activationForm.valid).toBeTrue();
    component.submit();

    tick();
    fixture.detectChanges();
    expect(component.progressing).toBeFalse();
    expect(component.submitted).toBeFalse();
    expect(component.submissionError).toBeTruthy();
    expect(component.hash.enabled).toBeTrue();
  }));

});
