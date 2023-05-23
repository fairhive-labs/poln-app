import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of, throwError } from 'rxjs';
import { PreregisterService } from '../preregister.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let preregisterService: jasmine.SpyObj<PreregisterService>;

  const sponsor = '0xE3C3691DB5f5185F37A3f98e5ec76403B2d10c3E';

  beforeEach(async () => {
    preregisterService = jasmine.createSpyObj('PreregisterService', ['register','saveHash']);
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatProgressBarModule,
      ],
      declarations: [RegisterComponent],
      providers: [{ provide: PreregisterService, useValue: preregisterService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 7 types of user', () => {
    expect(component.types).toBeTruthy();
    expect(component.types).toHaveSize(7);
  });

  it('should contain 4 formcontrol in form group', () => {
    expect(Object.keys(component.preregistrationForm.controls)).toHaveSize(4);
  });

  it('should call submit()', fakeAsync(() => {
    const registerResponse = {
      hash: 'h4Sh'
    }
    preregisterService.register.and.returnValue(of(registerResponse));

    const email = 'jsie@trendev.fr';
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const type = 'mentor';

    component.address.setValue(address);
    component.email.setValue(email);
    component.type.setValue(type);
    component.sponsor.setValue(sponsor);
    expect(component.preregistrationForm.valid).toBeTrue();
    component.submit();

    tick();
    fixture.detectChanges();

    expect(component.progressing).toBeFalse();
    expect(component.submitted).toBeTrue();
    expect(component.submissionError).toBeFalsy();
    expect(component.address.enabled).toBeTrue();
    expect(component.email.enabled).toBeTrue();
    expect(component.type.enabled).toBeTrue();
    expect(component.sponsor.enabled).toBeTrue();
  }));

  it('should call submit() and display an error', fakeAsync(() => {
    preregisterService.register.and.returnValue(throwError(() => new Error(`error thrown as expected, it's cool !`)));

    const email = 'jsie@trendev.fr';
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const type = 'mentor';

    component.address.setValue(address);
    component.email.setValue(email);
    component.type.setValue(type);
    component.sponsor.setValue(sponsor);
    expect(component.preregistrationForm.valid).toBeTrue();
    component.submit();

    tick();
    fixture.detectChanges();
    expect(component.progressing).toBeFalse();
    expect(component.submitted).toBeFalse();
    expect(component.submissionError).toBeTruthy();
    expect(component.address.enabled).toBeTrue();
    expect(component.email.enabled).toBeTrue();
    expect(component.type.enabled).toBeTrue();
    expect(component.sponsor.enabled).toBeTrue();
  }));

  it('should be a valid user type', () => {
    component.type.setValue('talent');
    expect(component.type.valid).toBeTrue();
    component.type.setValue('fakeuser');
    expect(component.type.valid).toBeFalse();
    expect(component.type.hasError('incorrectUserType')).toBeTrue();
    component.type.setValue('');
    expect(component.type.hasError('required')).toBeTrue();
  });

  it('should be a valid eth address', () => {
    component.address.setValue('0x8ba1f109551bD432803012645Ac136ddd64DBA72');
    expect(component.address.valid).toBeTrue();
    component.address.setValue('0x');
    expect(component.address.valid).toBeFalse();
    expect(component.address.hasError('invalidEthAddress')).toBeTrue();
    component.address.setValue('');
    expect(component.address.hasError('required')).toBeTrue();
  });
  
  it('should be a valid email address', () => {
    component.email.setValue('john.doe@gmail.com');
    expect(component.email.valid).toBeTrue();
    component.email.setValue('john');
    expect(component.email.valid).toBeFalse();
    expect(component.email.hasError('email')).toBeTrue();
    component.email.setValue('');
    expect(component.email.hasError('required')).toBeTrue();
  });

  it('should be a valid sponsor address', () => {
    component.address.setValue(sponsor);
    expect(component.address.valid).toBeTrue();
    component.address.setValue('0x');
    expect(component.address.valid).toBeFalse();
    expect(component.address.hasError('invalidEthAddress')).toBeTrue();
    component.address.setValue('');
    expect(component.address.hasError('required')).toBeTrue();
  });
});

