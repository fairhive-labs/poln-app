import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PreregisterService, RegisterResponse, ActivateResponse } from './preregister.service';

describe('PreregisterService', () => {
  let service: PreregisterService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(PreregisterService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain a valid url', () => {
    expect(service.url).toBeTruthy();
  });

  it('can POST to register endpoint', () => {
    const url = service.url;
    const testData: RegisterResponse = { hash: 'h4Sh' };
    const email = 'jsie@trendev.fr';
    const address = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    const type = 'mentor';

    http.post<RegisterResponse>(`${url}/`, {
      address: address,
      email: email,
      type: type,
    }).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('should fail', () => {
    const url = service.url;
    const email = 'jsie@trendev.fr';
    const address = '0x';
    const type = 'mentor';
    const err = { error: 'bad address' }

    http.post<RegisterResponse>(`${url}/`, {
      address: address,
      email: email,
      type: type,
    }).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(400);
        expect(error.error).withContext('message').toEqual(err);
      },
    });
    const req = httpTestingController.expectOne(`${url}/`);
    req.flush(err, { status: 400, statusText: 'Bad Request' });

  });

  it('can POST to activate endpoint', () => {
    const url = service.url;
    const token = 't0k3N';
    const hash = 'h4Sh';
    const testData: ActivateResponse = { token: token, activated: true };

    http.post<ActivateResponse>(`${url}/activate/${token}/${hash}`, null).subscribe(r => expect(r).toEqual(testData));
    const req = httpTestingController.expectOne(`${url}/activate/${token}/${hash}`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
});
