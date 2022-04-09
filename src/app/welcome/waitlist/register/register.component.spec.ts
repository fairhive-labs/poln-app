import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, of, throwError } from 'rxjs';
import { PreregisterService } from '../preregister.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let preregisterService: jasmine.SpyObj<PreregisterService>;
  beforeEach(async () => {
    preregisterService = jasmine.createSpyObj('PreregisterService', ['register']);
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

  it('should contain 3 formcontrol in form group', () => {
    expect(Object.keys(component.controls)).toHaveSize(3);
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
  }));

  it('should call submit() but display an error', fakeAsync(() => {
    preregisterService.register.and.returnValue(throwError(() => new Error('something goes wrong')));

    const email = 'jsie@trendev.fr';
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const type = 'mentor';

    component.address.setValue(address);
    component.email.setValue(email);
    component.type.setValue(type);
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
  }));
});
