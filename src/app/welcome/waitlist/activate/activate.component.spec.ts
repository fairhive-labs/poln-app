import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PreregisterService } from '../preregister.service';

import { ActivateComponent } from './activate.component';

describe('ActivateComponent', () => {
  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;
  let preregisterService: jasmine.SpyObj<PreregisterService>;
  const hash = 'Th1sASuP3RhA5h';
  beforeEach(async () => {
    preregisterService = jasmine.createSpyObj('PreregisterService', ['activate', 'loadHash', 'clearHash']);
    preregisterService.loadHash.and.returnValue(hash);
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
    expect(Object.keys(component.activationForm.controls)).toHaveSize(1);
  });

  it('should call submit()', fakeAsync(() => {
    const activateResponse = {
      address: "0xeth_address_01",
      email: "john.doe@gmail.com",
      uuid: "uu1d",
      timestamp: 1684253919,
      type: "talent",
      sponsor: '0xE3C3691DB5f5185F37A3f98e5ec76403B2d10c3E',
    };
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
    preregisterService.activate.and.returnValue(throwError(() => new Error(`error thrown as expected, it's cool !`)));

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

  it('should be a valid hash', () => {
    component.hash.setValue('h4sH');
    expect(component.hash.valid).toBeTrue();
    component.hash.setValue('');
    expect(component.hash.hasError('required')).toBeTrue();
  });

  it('should load hash from local storage', () => {
    expect(component.hash.value).toEqual(hash);
    expect(component.hash.valid).toBeTrue();
  });
});
